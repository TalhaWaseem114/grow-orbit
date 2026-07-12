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

const DEFAULT_TEMPLATE_BODY = `<h2>AMAZON GROWTH PARTNERSHIP AGREEMENT</h2>
<p>This Agreement is made between Grow Orbit ("Agency") and the Client ("Client") on the date above.</p>

<h3>1. SCOPE OF SERVICES</h3>
<p>Grow Orbit will provide the Amazon growth services as outlined in the Statement of Work (SOW) attached to this agreement.</p>

<h3>2. TERM & COMMITMENT</h3>
<p>The initial term of this agreement is <strong>{{initial_term}}</strong> from the agreement date. After the initial term, the agreement will renew automatically on a month-to-month basis unless either party provides 30 days written notice.</p>

<h3>3. MONTHLY INVESTMENT</h3>
<p>Client agrees to pay the monthly retainer fee as specified in the SOW. Payment is due in advance on the 1st of each month.</p>

<h3>4. CLIENT RESPONSIBILITIES</h3>
<p>Client agrees to provide necessary access to Amazon Seller Central, Advertising Console, Brand Registry and other relevant accounts required to perform the services.</p>

<h3>5. PERFORMANCE & EXPECTATIONS</h3>
<p>While Grow Orbit will use best efforts and proven strategies to grow your Amazon business, results may vary based on market conditions, inventory, competition and other factors outside our control.</p>

<h3>6. CONFIDENTIALITY</h3>
<p>Both parties agree to keep confidential all non-public information shared during the course of this agreement.</p>

<h3>7. TERMINATION</h3>
<p>Either party may terminate this agreement with 30 days written notice after the initial term. Outstanding payments are due upon termination.</p>

<h3>8. GOVERNING LAW</h3>
<p>This agreement shall be governed by and construed in accordance with the laws of the jurisdiction in which Grow Orbit is registered.</p>

<p><em>IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.</em></p>`;

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
