const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: "../.env" });

// const options = {
//   db: {
//     schema: "public",
//   },
//   auth: {
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: true,
//   },
//   global: {
//     headers: { "x-my-custom-header": "my-app-name" },
//   },
// };

const supabaseUrl = "https://xkpgmcvsevpwzhzkafwc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrcGdtY3ZzZXZwd3poemthZndjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY0NTQzMTEsImV4cCI6MTk4MjAzMDMxMX0.BJ1qsGP5v7FqqmWSyszpD1xSWgOogzBvFtnrpADwJYs";

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = { supabase };
// aeJYRBMHJ27nkBVU
