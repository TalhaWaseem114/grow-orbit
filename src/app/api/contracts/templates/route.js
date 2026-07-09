import { NextResponse } from "next/server";
import { checkAdminOperational } from "@/utils/dbHelper";
import { adminDb } from "@/firebase/firebaseAdmin";
import { db as clientDb } from "@/firebase/firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";

async function getAllTemplates() {
  try {
    const isAdmin = await checkAdminOperational();
    if (isAdmin) {
      const snap = await adminDb.collection("contractTemplates").get();
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } else {
      const snap = await getDocs(collection(clientDb, "contractTemplates"));
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    }
  } catch (err) {
    // Last resort: try client SDK directly
    const snap = await getDocs(collection(clientDb, "contractTemplates"));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }
}

const DEFAULT_TEMPLATE_BODY = `<h1>Service Agreement</h1>
<p>This Service Agreement (the "Agreement") is entered into as of <strong>{{contract_date}}</strong> by and between <strong>Grow Orbit</strong> and <strong>{{client_name}}</strong> (representative of <strong>{{company_name}}</strong>).</p>

<h3>1. Scope of Services</h3>
<p>Grow Orbit will provide marketing campaigns and growth strategies tailored to the client's business, specifically targeting the promotion of <strong>{{requested_service}}</strong>.</p>

<h3>2. Fees & Retainer</h3>
<p>The client agrees to pay a monthly retainer of <strong>{{monthly_retainer}}</strong>. Invoices are issued on a <strong>{{payment_terms}}</strong> schedule.</p>

<h3>3. Term & Termination</h3>
<p>This agreement shall commence on <strong>{{start_date}}</strong> and run on a <strong>{{term_length}}</strong> basis. Either party may terminate this agreement with 15 days written notice.</p>

<p>IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the date first written above.</p>`;

export async function GET(request) {
  try {
    let templates = await getAllTemplates();

    if (templates.length === 0) {
      const defaultTemplate = {
        name: "Standard Marketing Service Agreement",
        category: "Marketing",
        body: DEFAULT_TEMPLATE_BODY,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      try {
        const ref = await addDoc(collection(clientDb, "contractTemplates"), defaultTemplate);
        templates = [{ id: ref.id, ...defaultTemplate }];
      } catch (e) {
        // Even if saving fails, return the default so the contract can still be created
        templates = [{ id: "default", ...defaultTemplate }];
      }
    }

    return NextResponse.json({ success: true, templates });
  } catch (error) {
    console.error("GET templates route error:", error);
    // Always return a usable default template even on error
    return NextResponse.json({ 
      success: true, 
      templates: [{ id: "default", name: "Standard Agreement", body: DEFAULT_TEMPLATE_BODY }] 
    });
  }
}
