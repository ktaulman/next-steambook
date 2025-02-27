import postgres from "postgres";


export async function GET() { 
    try { 
        return Response.json({
            data: {
                field1: '111',
                field2:'2222'
        } })
    } catch (e) {

     }
}