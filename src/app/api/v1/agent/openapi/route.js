import { NextResponse } from "next/server";

/**
 * GET /api/v1/agent/openapi
 * Returns OpenAPI 3.0 specification for Muse AI and other agent integrations
 */
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.groworbitofficial.com";

  const openApiSpec = {
    openapi: "3.0.3",
    info: {
      title: "Grow Orbit - Muse AI Agent API",
      description: "Secure, read-only Agent API enabling Muse AI to inspect lead pipeline stages, customer inquiries, and conversion statuses from the Grow Orbit admin dashboard.",
      version: "1.0.0",
      contact: {
        name: "Grow Orbit Engineering",
        url: baseUrl,
      },
    },
    servers: [
      {
        url: baseUrl,
        description: "Production Server",
      },
      {
        url: "http://localhost:3000",
        description: "Local Development Server",
      },
    ],
    paths: {
      "/api/v1/agent/leads": {
        get: {
          summary: "Fetch Leads Pipeline Data (Read-Only)",
          description: "Fetches leads currently in the Grow Orbit CRM pipeline, with scoring, status tracking, meeting booking indicators, and contact details. Strictly read-only.",
          operationId: "fetchLeadsPipeline",
          security: [
            {
              BearerAuth: [],
            },
            {
              ApiKeyAuth: [],
            },
            {
              QueryKeyAuth: [],
            },
          ],
          parameters: [
            {
              name: "status",
              in: "query",
              required: false,
              description: "Filter by lead status: new, contacted, qualified, hot, proposal_sent, won, lost, cold",
              schema: {
                type: "string",
                enum: ["new", "contacted", "qualified", "hot", "proposal_sent", "won", "lost", "cold"],
              },
            },
            {
              name: "phase",
              in: "query",
              required: false,
              description: "Filter by pipeline phase: lead_in, meeting_booked, research, contact, proposal, outcome",
              schema: {
                type: "string",
                enum: ["lead_in", "meeting_booked", "research", "contact", "proposal", "outcome"],
              },
            },
            {
              name: "search",
              in: "query",
              required: false,
              description: "Case-insensitive keyword search across lead name, email, brand, notes, or service",
              schema: {
                type: "string",
              },
            },
            {
              name: "since",
              in: "query",
              required: false,
              description: "Fetch leads created on or after this ISO date (e.g. 2026-10-01)",
              schema: {
                type: "string",
                format: "date",
              },
            },
            {
              name: "limit",
              in: "query",
              required: false,
              description: "Maximum number of leads to return (1-500, default 100)",
              schema: {
                type: "integer",
                default: 100,
                minimum: 1,
                maximum: 500,
              },
            },
          ],
          responses: {
            "200": {
              description: "Successfully retrieved leads pipeline data",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      agent: { type: "string", example: "Muse AI" },
                      accessMode: { type: "string", example: "read_only" },
                      timestamp: { type: "string", format: "date-time" },
                      summary: {
                        type: "object",
                        properties: {
                          totalLeadsInDatabase: { type: "integer" },
                          returnedLeadsCount: { type: "integer" },
                          hotLeadsCount: { type: "integer" },
                          wonLeadsCount: { type: "integer" },
                          pipelineBreakdown: {
                            type: "object",
                            properties: {
                              leadIn: { type: "integer" },
                              meetingBooked: { type: "integer" },
                              researched: { type: "integer" },
                              contacted: { type: "integer" },
                              proposalSent: { type: "integer" },
                              won: { type: "integer" },
                              lost: { type: "integer" },
                              cold: { type: "integer" },
                            },
                          },
                        },
                      },
                      leads: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "string" },
                            fullName: { type: "string" },
                            email: { type: "string" },
                            whatsapp: { type: "string" },
                            brandName: { type: "string" },
                            requestedService: { type: "string" },
                            monthlyRevenue: { type: "string" },
                            asinOrUrl: { type: "string" },
                            notes: { type: "string" },
                            status: { type: "string" },
                            statusLabel: { type: "string" },
                            pipelinePhase: { type: "string" },
                            priority: { type: "string", enum: ["high", "medium", "low"] },
                            leadScore: { type: "integer" },
                            scoreCategory: { type: "string", enum: ["Hot", "Warm", "Cold"] },
                            meetingBooked: { type: "boolean" },
                            bookedAt: { type: "string", nullable: true },
                            source: { type: "string" },
                            createdAt: { type: "string", format: "date-time" },
                            ageDays: { type: "integer" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            "401": {
              description: "Unauthorized - Invalid or missing API key",
            },
            "405": {
              description: "Method Not Allowed - Write/update/delete operations are strictly forbidden",
            },
          },
        },
      },
      "/api/v1/agent/email/template": {
        get: {
          summary: "Get Grow Orbit Email Design System Guidelines",
          description: "Returns the official Grow Orbit email design tokens, colors, component hierarchy, and guidelines so Muse AI can understand the design structure.",
          operationId: "getEmailDesignGuidelines",
          security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }, { QueryKeyAuth: [] }],
          responses: {
            "200": {
              description: "Official design guidelines and example JSON payloads",
            },
          },
        },
        post: {
          summary: "Compile Email into Official Grow Orbit Branded HTML Template",
          description: "Takes structured email content (headline, intro, key insight, highlights table, CTA button, contact card) and compiles it into the exact pixel-perfect, bulletproof Grow Orbit HTML email template.",
          operationId: "compileGrowOrbitEmail",
          security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }, { QueryKeyAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    subject: { type: "string", example: "Amazon 3D Product Rendering: Why Brands are Switching in 2026" },
                    previewText: { type: "string", example: "Cut photography costs by 60% with CAD assets" },
                    recipientName: { type: "string", example: "Amir Baig" },
                    badge: { type: "string", example: "VISUAL ASSET STRATEGY" },
                    headline: { type: "string", example: "Transform Your Amazon Listing Visuals" },
                    intro: { type: "string", example: "I wanted to share a quick strategic breakdown of why consumer brands are moving away from traditional studio shoots toward unified 3D rendering pipelines." },
                    keyInsight: { type: "string", example: "Across top-performing listings, 3D CAD modeling reduces future label and colorway variation costs from $250+ down to $35–$75 per render." },
                    highlightCards: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          icon: { type: "string", example: "🚀" },
                          title: { type: "string", example: "Pure White Hero Renders" },
                          desc: { type: "string", example: "100% Amazon TOS compliant (RGB 255), zero glare, 85%+ frame fill" },
                        },
                      },
                    },
                    ctaText: { type: "string", example: "Book Free 3D Strategy Session" },
                    ctaUrl: { type: "string", example: "https://www.groworbitofficial.com/get-started/" },
                    includeMeetingCard: { type: "boolean", default: true },
                    signOffName: { type: "string", example: "Talha Waseem" },
                    signOffRole: { type: "string", example: "Technical Strategist | Grow Orbit" },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Compiled Grow Orbit bulletproof HTML email ready to send",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      agent: { type: "string" },
                      format: { type: "string" },
                      subject: { type: "string" },
                      previewText: { type: "string" },
                      compiledHtml: { type: "string" },
                      htmlLength: { type: "integer" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "Token",
          description: "Supply token in 'Authorization: Bearer <key>'",
        },
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
          description: "Supply token in 'x-api-key: <key>' header",
        },
        QueryKeyAuth: {
          type: "apiKey",
          in: "query",
          name: "apiKey",
          description: "Supply token as query param '?apiKey=<key>'",
        },
      },
    },
  };

  return NextResponse.json(openApiSpec, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
