---
title: Open Data API
layout: page
---

Our goal is to be completely transparent with our data, including contributors, beneficiaries, and processes. You can use our Open Data API to programmatically access this data, sourced directly from our [GitHub](https://github.com/Karuna2020/open-data) repository, and updated every 15 minutes to 1 hour.

Our Open Data API, as the name suggests, is completely open — CORS-enabled, with no rate limits, authentication, or fees. Show us what you build!

<a class="cta" href="https://open-data.karuna2020.org">View API endpoints →</a>

## Triggers

These are webhook triggers you can use to re-build our API data and website. Please use them responsibly.

-   <button data-trigger="airtable">Update data from Airtable</button>
-   <button data-trigger="sheets">Update data from Google Sheets</button>
-   <button data-trigger="site">Build and deploy site</button>

<script>
var waiting = false;
function triggerWebhook(e, repo, event) {
  if (waiting) return;
  console.log("Triggering hook", repo, event);
  var text = e.target.innerText;
  if (e.target) e.target.innerText = "Triggering...";
  waiting = true;
  fetch("https://cors-anywhere.herokuapp.com/https://services.anandchowdhary.now.sh/api/github-trigger?repo=" + repo + "&event=" + event, {
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    }
  })
    .then(function() { e.target.innerText = "Triggered" })
    .catch(function() { e.target.innerText = "Error in triggering" })
    .then(function() { waiting = false; setTimeout(function() {
      e.target.innerText = text;
    }, 5000); });
}
document.querySelector("[data-trigger='airtable']").addEventListener("click", function(e){ triggerWebhook(e, "Karuna2020/open-data", "update_airtable") });
document.querySelector("[data-trigger='sheets']").addEventListener("click", function(e){ triggerWebhook(e, "Karuna2020/open-data", "update_sheets") });
document.querySelector("[data-trigger='site']").addEventListener("click", function(e){ triggerWebhook(e, "Karuna2020/karuna2020.org", "update") });
</script>
