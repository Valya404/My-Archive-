 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a//dev/null b/README.md
index 0000000000000000000000000000000000000000..45806208ea41e4845430885337c267e9f9c1333d 100644
--- a//dev/null
+++ b/README.md
@@ -0,0 +1,28 @@
+# My Archive 😮‍💨 🤤
+
+This project is a small browser based archive where visitors can save and browse stories. The data is stored in [Supabase](https://supabase.com/). The site is fully static so it can be hosted on any static hosting provider or simply opened locally.
+
+## Supabase configuration
+
+1. Create a Supabase project and table (for example `stories` with fields `title`, `text` and `image_url`).
+2. Take the project URL and the anonymous API key from the Supabase dashboard.
+3. Update `supabase-config.js` with your credentials or export them as environment variables:
+   - `SUPABASE_URL` – the project URL.
+   - `SUPABASE_KEY` – the anonymous API key.
+
+The supplied `script.js` expects to read these values so it can connect to your Supabase backend.
+
+## Running locally
+
+You can open `index.html` directly in your browser or serve the folder with any static server:
+
+```bash
+# Using Python
+python3 -m http.server
+
+# Or with npx
+npx serve .
+```
+
+Then navigate to the displayed address (e.g. <http://localhost:8000>) to use the site.
+
 
EOF
)
