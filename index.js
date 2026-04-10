const messages = [
  "a capella – laulu esitamine ilma saateta",
  "akord – kolme või enama heli kooskõla",
  "akustika – heli omadused ja kõlavustingimused ruumides, ja materjalides",
  "arranžeerija – muusikapala seadja teisele kossseisule"
 "dünaamika – helitugevuse muutumine, mis aitab muusikapala ilmekamaks muuta"
 "etnomuusika – rahva- ehk pärimusmuusika"
 "harmoonia – helide kooskõla"
 "instrumentaalmuusika – pillimuusika"
 "levimuusika -lihtsa sisu ja vormiga meeldejääv muusika, mida levitatakse meediakanalites"
 "mänedžer – muusiku esindaja, kes hoolitseb muusiku töötingimuste eest"
 "partituur –  kõigi pillipartiide koondnoodistik"
 "rütm – erinevate helivältuste korrastatud järgnevus"
 "taktimõõt – number, mis näitab löökide arvu ühes taktis"
 "teema – muusikaline mõte, ühehäälselt väljendatud  meloodia"
 "tempo – heliteose esitamise kiirus"
 "vokaalmuusika -  laulumuusika"
 "helilaad – helikõrguste süsteem, kurb või rõõmus kõla, duur ja moll"
 "pentatoonika – viie astmeline helilaad"
 "tämber – inimhäälele või instrumendile iseloomulik kõlavärving"
];

const BOT_TOKEN = "MTQ3NTUyMDE1NTU4Mzc3NDg2Mg.GsJKDm.TU_y-wwez7CKRrCP3m1MJK-bcQO5ndEcUXU9vM";
const USER_ID = "1105185630041936013";

async function sendDM(content) {
  const dmRes = await fetch(`https://discord.com/api/v10/users/@me/channels`, {
    method: "POST",
    headers: {
      "Authorization": `Bot ${BOT_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ recipient_id: USER_ID })
  });
  const dm = await dmRes.json();

  await fetch(`https://discord.com/api/v10/channels/${dm.id}/messages`, {
    method: "POST",
    headers: {
      "Authorization": `Bot ${BOT_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ content })
  });
}

function waitUntil(hour, minute, tzOffset) {
  const now = new Date();
  const target = new Date();
  target.setUTCHours(hour - tzOffset, minute, 0, 0);
  if (target <= now) target.setUTCDate(target.getUTCDate() + 1);
  return new Promise(r => setTimeout(r, target - now));
}

async function runMessages() {
  for (let i = 0; i < messages.length; i++) {
    await sendDM(messages[i]);
    console.log(`Sent message ${i + 1}/${messages.length}`);

    if (i < messages.length - 1) {
      if (i % 2 === 0) {
        await new Promise(r => setTimeout(r, 10000)); // 10s to :10
      } else {
        await new Promise(r => setTimeout(r, 50000)); // 50s back to :00
      }
    }
  }
}

async function run() {
  console.log("Waiting until 10:10 AM Tartu time...");
  await waitUntil(10, 10, 3);

  console.log("Starting run 1...");
  await runMessages();

  console.log("Run 1 done! Waiting 1 minute...");
  await new Promise(r => setTimeout(r, 60000));

  console.log("Starting run 2...");
  await runMessages();

  console.log("All done!");
}

run();
