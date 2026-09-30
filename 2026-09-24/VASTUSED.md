# Tunnitöö #3: Node.js – Teoreetilised vastused ja lahendused (VASTUSED.md)

See dokument sisaldab põhjalikke vastuseid kõikidele 15 teemale, uurimisküsimustele (*Research and explain*) ja esitluse nõuetele failist `README.md`.

---

## Teema 1: Mis on Node.js ja JavaScripti jooksutamine väljaspool brauserit

### 1. Uurimisküsimused ja vastused:

- **Node.js kui JavaScripti käituskeskkond (*runtime*):**
  - Node.js on avatud lähtekoodiga, platvormideülene JavaScripti käituskeskkond, mis põhineb Google Chrome'i V8 JavaScript-mootoril. See võimaldab JavaScripti koodi jooksutada väljaspool veebibrauserit – otse arvuti operatsioonisüsteemis. See tähendab, et JavaScripti saab kasutada serveripoolse loogika, käsurearakenduste, failisüsteemi operatsioonide ja palju muu jaoks.

- **Brauseri JavaScript vs serveripoolne JavaScript:**
  - **Brauseris:** JavaScriptil on juurdepääs DOM-ile (`document`), aknale (`window`), sündmustele (`addEventListener`) ja brauseri API-dele (nt `localStorage`, `fetch` brauserist).
  - **Node.js-is:** JavaScriptil on juurdepääs failisüsteemile (`fs`), võrgule (`http`, `net`), operatsioonisüsteemi infole (`os`), protsessihaldusele (`process`) jm. DOM-i ja `window` objekti ei eksisteeri.

- **Miks Node.js ei paku brauseri `document` objekti?**
  - `document` objekt esindab veebilehe HTML-i struktuuri (DOM-puud). Node.js töötab serveris, kus HTML lehte ei ole – seega pole mõtet `document` objekti pakkuda. Kui proovida Node.js-is kasutada `document.getElementById(...)`, saadakse viga `ReferenceError: document is not defined`.

- **Miks JavaScripti faili jooksutamine ei loo automaatselt veebiserverit?**
  - JavaScripti fail on lihtsalt koodifail. Kui failis pole veebiserverit loovat koodi (nt `http.createServer()` või Express'i `app.listen()`), siis fail lihtsalt käivitab oma käsud ja lõpetab töö. Veebiserver tuleb programmeerija poolt eraldi luua.

- **Node.js ja npm versioonide kontrollimine:**
  ```bash
  node --version    # nt v22.x.x
  npm --version     # nt 10.x.x
  ```

### 2. Koodilahendus:

```js
// index.js
const tasks = [
  { id: 1, title: "Õpi Node.js-i", completed: false },
  { id: 2, title: "Harjuta Expressi", completed: true },
  { id: 3, title: "Loo API", completed: false },
];

console.log("Tere tulemast Task Tracker rakendusse!");
console.log("Ülesanded:");
tasks.forEach((task) => {
  const status = task.completed ? "✅" : "❌";
  console.log(`  ${status} [${task.id}] ${task.title}`);
});
```

Käivitamine:
```bash
node index.js
```

### 3. Levinud viga ja lahendus:

- **Viga:** Üritatakse kasutada brauseri API-sid Node.js-is:
  ```js
  document.getElementById("app"); // ReferenceError: document is not defined
  ```
- **Lahendus:** Node.js-is kasutatakse konsooli väljundit ja Node.js-spetsiifilisi mooduleid:
  ```js
  console.log("Tere!"); // Õige, töötab Node.js-is
  ```

### 4. Seos Task Trackeriga:

Node.js on meie Task Tracker taustaprogrammi (backend) alus – see võimaldab JavaScriptis kirjutada serverit, mis haldab ülesandeid, töötleb päringuid ja salvestab andmeid.

---

## Teema 2: npm, package.json ja projekti skriptid

### 1. Uurimisküsimused ja vastused:

- **Projekti loomine käsuga `npm init -y`:**
  - See loob automaatselt `package.json` faili vaikeväärtustega. Lipp `-y` vastab kõikidele küsimustele automaatselt "jah" (yes).
  ```bash
  npm init -y
  ```

- **Sõltuvused (*dependencies*) vs arendussõltuvused (*devDependencies*):**
  - **`dependencies`**: Paketid, mida rakendus vajab tootmises käivitamiseks (nt `express`).
    ```bash
    npm install express
    ```
  - **`devDependencies`**: Paketid, mida vajatakse ainult arendamise ajal (nt `vitest`, `supertest`).
    ```bash
    npm install --save-dev vitest
    ```

- **`package.json`, `package-lock.json` ja `node_modules`:**
  - **`package.json`**: Projekti "pass" – sisaldab nime, versiooni, skripte, sõltuvuste loetelu. See on inimloetav ja käsitsi redigeeritav.
  - **`package-lock.json`**: Lukustab kõik sõltuvused ja nende alamsõltuvused täpsete versioonidega. Tagab, et iga arendaja ja server saab täpselt samad versioonid. **Tuleb committida Giti!**
  - **`node_modules`**: Kaust, kuhu npm paigaldab kõik teegid. Sisaldab tuhandeid faile. **Ei tohi kunagi Giti committida!**

- **`npm install` vs `npm ci`:**
  - **`npm install`**: Paigaldab sõltuvused `package.json` alusel ja võib uuendada `package-lock.json` faili.
  - **`npm ci`**: Paigaldab täpselt `package-lock.json` alusel, kustutab enne olemasoleva `node_modules` kausta. Sobib CI/CD keskkondade jaoks, kus on vaja täpset reprodutseeritavust.

- **npm skriptide loomine ja käivitamine:**
  ```json
  {
    "scripts": {
      "start": "node src/server.js",
      "dev": "node --watch src/server.js",
      "test": "vitest"
    }
  }
  ```
  Käivitamine:
  ```bash
  npm start        # käivitab "start" skripti
  npm run dev      # käivitab "dev" skripti
  npm test         # käivitab "test" skripti (erijuht, ei vaja "run")
  ```

- **`node_modules` ignoreerimine Gitis:**
  - Failis `.gitignore` lisada rida:
    ```
    node_modules/
    ```

### 2. Koodilahendus:

`package.json` näide:
```json
{
  "name": "task-tracker-api",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
    "dev": "node --watch src/server.js"
  },
  "dependencies": {
    "express": "^4.21.0"
  }
}
```

### 3. Levinud viga ja lahendus:

- **Viga:** `node_modules` kausta Giti lisamine, mis teeb hoidla tohutult suureks.
- **Lahendus:** Lisada `.gitignore` faili `node_modules/` **enne** esimest committimist. Kui on juba committitud, eemaldada:
  ```bash
  git rm -r --cached node_modules
  ```

### 4. Seos Task Trackeriga:

`package.json` on meie Task Tracker backend-projekti alus – see määrab, kuidas server käivitub (`npm start`), millised teegid on vajalikud ja kuidas teste jooksutada.

---

## Teema 3: Moodulid ja korduvkasutatavad ülesandefunktsioonid

### 1. Uurimisküsimused ja vastused:

- **`"type": "module"` failis `package.json`:**
  - See lubab kasutada kaasaegset ES-moodulite süntaksit (`import`/`export`) CommonJS-i asemel (`require`/`module.exports`). Ilma selleta kasutab Node.js vaikimisi CommonJS formaati.
  ```json
  { "type": "module" }
  ```

- **Nimega ekspordid ja impordid (*named exports and imports*):**
  ```js
  // tasks.js – eksportimine
  export function getAllTasks(tasks) { ... }
  export function getTaskById(tasks, id) { ... }

  // index.js – importimine
  import { getAllTasks, getTaskById } from "./tasks.js";
  ```

- **Suhtelised impordireitid ja `.js` laiendid:**
  - Node.js ES-moodulites **peab** alati kasutama suhtelist rada (`./`) ja faililaiendi `.js`:
    ```js
    import { getAllTasks } from "./tasks.js"; // ✅ Õige
    import { getAllTasks } from "./tasks";    // ❌ Viga – laiend puudu
    import { getAllTasks } from "tasks.js";   // ❌ Viga – suhteline rada puudu
    ```

- **Andmete, töötlusfunktsioonide ja käivituskoodi eraldamine:**
  - **Andmed** (`data/tasks.js`): ülesannete massiiv.
  - **Funktsioonid** (`utils/taskFunctions.js`): puhtad funktsioonid, mis töötlevad andmeid.
  - **Käivituskood** (`index.js`): impordib andmed ja funktsioonid, käivitab rakenduse.

- **Väärtuste tagastamine logimise asemel:**
  - Funktsioon peaks **tagastama** (`return`) tulemuse, mitte seda lihtsalt konsooli logima. See muudab funktsiooni korduvkasutatavaks ja testitavaks.
  ```js
  // ❌ Vale
  function getAllTasks(tasks) {
    console.log(tasks);
  }

  // ✅ Õige
  function getAllTasks(tasks) {
    return [...tasks];
  }
  ```

### 2. Koodilahendus:

```js
// src/taskFunctions.js
export function getAllTasks(tasks) {
  return [...tasks];
}

export function getTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}

export function getCompletedTasks(tasks) {
  return tasks.filter((task) => task.completed);
}
```

```js
// index.js
import { getAllTasks, getTaskById, getCompletedTasks } from "./src/taskFunctions.js";

const tasks = [
  { id: 1, title: "Õpi Node.js-i", completed: false },
  { id: 2, title: "Harjuta Expressi", completed: true },
  { id: 3, title: "Loo API", completed: false },
];

console.log("Kõik:", getAllTasks(tasks));
console.log("ID 2:", getTaskById(tasks, 2));
console.log("Tehtud:", getCompletedTasks(tasks));
console.log("Tundmatu ID:", getTaskById(tasks, 999)); // undefined
console.log("Tühi massiiv:", getAllTasks([])); // []
```

### 3. Levinud viga ja lahendus:

- **Viga:** `.js` laiendi unustamine importimisel:
  ```js
  import { getAllTasks } from "./taskFunctions"; // ERR_MODULE_NOT_FOUND
  ```
- **Lahendus:** Lisada alati `.js`:
  ```js
  import { getAllTasks } from "./taskFunctions.js";
  ```

### 4. Seos Task Trackeriga:

Moodulid võimaldavad Task Trackeri koodi jagada loogilistesse osadesse – andmekäsitlus, marsruudid, vahevara ja serveri käivitamine on kõik eraldi failides.

---

## Teema 4: HTTP, API-d ja JSON

### 1. Uurimisküsimused ja vastused:

- **Klient ja server:**
  - **Klient** (nt brauseris jooksev React rakendus) saadab päringuid (*requests*).
  - **Server** (nt Node.js/Express rakendus) võtab päringuid vastu, töötleb neid ja saadab vastuseid (*responses*).

- **Päringud ja vastused:**
  - **Päring** (*request*): kliendilt serverile. Sisaldab meetodit, URL-i, päiseid ja valikuliselt keha (*body*).
  - **Vastus** (*response*): serverilt kliendile. Sisaldab olekukoodi, päiseid ja valikuliselt keha.

- **URL, rada (*path*), päringusõne (*query string*), päised (*headers*) ja keha (*body*):**
  - **URL**: `http://localhost:3000/api/tasks?completed=true`
  - **Rada**: `/api/tasks`
  - **Päringusõne**: `?completed=true`
  - **Päised**: Metaandmed, nt `Content-Type: application/json`
  - **Keha**: Andmed, mida saadetakse serverile (nt POST päringus JSON)

- **HTTP meetodid:**
  - `GET` – andmete lugemine (nt ülesannete nimekirja küsimine)
  - `POST` – uue ressursi loomine (nt ülesande lisamine)
  - `PATCH` – ressursi osaline uuendamine (nt ülesande pealkirja muutmine)
  - `DELETE` – ressursi kustutamine (nt ülesande eemaldamine)

- **Olekukoodid:**
  - `200 OK` – päring õnnestus
  - `201 Created` – uus ressurss loodi edukalt
  - `204 No Content` – päring õnnestus, vastuse keha pole (nt DELETE)
  - `400 Bad Request` – kliendi päring on vigane (nt puudub pealkiri)
  - `404 Not Found` – ressurssi ei leitud (nt vale ID)
  - `500 Internal Server Error` – serveri sisemine viga

- **JavaScripti objekt vs JSON-tekst:**
  - **JS objekt**: mälus olev andmestruktuur – `{ id: 1, title: "test" }`
  - **JSON**: tekstiformaat andmete vahetamiseks – `'{"id":1,"title":"test"}'`
  - Teisendamine: `JSON.stringify(obj)` → JSON-tekst, `JSON.parse(text)` → JS objekt

### 2. Koodilahendus:

Päringu selgitus:
```text
GET /api/tasks/2
```
- **Meetod**: `GET` (andmete lugemine)
- **Rada**: `/api/tasks/2`
- **Tähendus**: Küsi ülesannet ID-ga 2

Vastus:
```json
{
  "id": 2,
  "title": "Practise React state",
  "completed": false
}
```
- **Olekukood**: `200 OK`
- **Keha**: JSON-objekt ühe ülesandega

### 3. Levinud viga ja lahendus:

- **Viga:** JSON-is ülakomade kasutamine topeltjutumärkide asemel:
  ```json
  { 'title': 'Learn Express' }  // ❌ Vale JSON
  ```
- **Lahendus:** JSON nõuab alati topeltjutumärke:
  ```json
  { "title": "Learn Express" }  // ✅ Õige JSON
  ```

### 4. Seos Task Trackeriga:

Task Tracker frontend (React) suhtleb backendiga (Node.js/Express) HTTP päringute kaudu, vahetades andmeid JSON formaadis. Iga CRUD-operatsioon (Create, Read, Update, Delete) vastab kindlale HTTP meetodile.

---

## Teema 5: Express ja esimene API marsruut

### 1. Uurimisküsimused ja vastused:

- **Mis Express lisab Node.js-ile?**
  - Express on minimalistlik veebiraamisitk (*framework*) Node.js-ile. Puhas Node.js nõuab HTTP serverit käsitsi üles ehitada (`http.createServer`), päringuid parsida ja vastuseid vormindada. Express pakub marsruutimist (*routing*), vahevara (*middleware*), lihtsustatud päringu/vastuse käsitlemist ja palju muud.

- **Expressi paigaldamine:**
  ```bash
  npm install express
  ```

- **Expressi rakenduse loomine:**
  ```js
  import express from "express";
  const app = express();
  ```

- **`req`, `res`, `res.json()` ja `app.listen()`:**
  - **`req`** (*request*): Sissetulevat päringut esindav objekt (meetod, URL, päised, keha).
  - **`res`** (*response*): Vastuse objekt, millega saadetakse andmed tagasi kliendile.
  - **`res.json()`**: Saadab JSON-vastuse ja seab automaatselt `Content-Type: application/json` päise.
  - **`app.listen(port)`**: Käivitab serveri ja kuulab antud pordil sissetulevaid ühendusi.

- **Pordid ja localhost:**
  - **Port**: Numbriline aadress arvuti sees, mis identifitseerib konkreetset protsessi (nt 3000).
  - **`localhost`** (ehk `127.0.0.1`): Viitab arvuti enda aadressile – päring ei lahku arvutist.
  - Aadress: `http://localhost:3000/api/health`

- **Eksporditud `app` eraldamine kuulamise koodist:**
  - `app` luuakse ja eksporditakse ühes failis (`src/app.js`), server käivitatakse teises (`src/server.js`). See võimaldab testides importida `app` ilma serverit käivitamata.

### 2. Koodilahendus:

```js
// src/app.js
import express from "express";

const app = express();

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
```

```js
// src/server.js
import app from "./app.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server töötab aadressil http://localhost:${PORT}`);
});
```

Käivitamine:
```bash
node src/server.js
```

Testimiseks brauseris või cURL-iga:
```bash
curl http://localhost:3000/api/health
# Vastus: {"status":"ok"}
```

### 3. Levinud viga ja lahendus:

- **Viga:** `app.listen()` ja `app` eksport samas failis – testid käivitavad serveri iga kord:
  ```js
  // ❌ Vale – kõik ühes failis
  const app = express();
  app.get("/api/health", (req, res) => res.json({ status: "ok" }));
  app.listen(3000);
  export default app;
  ```
- **Lahendus:** Eraldada `app` ja `listen`:
  ```js
  // src/app.js – ainult app, ilma listen
  export default app;

  // src/server.js – käivitab serveri
  import app from "./app.js";
  app.listen(3000);
  ```

### 4. Seos Task Trackeriga:

Express on meie Task Tracker backend-serveri selgroog. Health-endpoint (`/api/health`) on esimene samm API ülesehitamisel ja sobib ka monitoorimiseks.

---

## Teema 6: GET marsruudid, tee- ja päringusõne parameetrid

### 1. Uurimisküsimused ja vastused:

- **Kollektsiooni lugemine (*reading a collection*):**
  - `GET /api/tasks` tagastab kõik ülesanded massiivina.

- **`req.params` vs `req.query`:**
  - **`req.params`**: Dünaamilised teeparameetrid URL-is.
    - Marsruut: `/api/tasks/:id` → URL: `/api/tasks/5` → `req.params.id` on `"5"`
  - **`req.query`**: Päringusõne parameetrid (`?` järel).
    - URL: `/api/tasks?completed=true` → `req.query.completed` on `"true"`

- **Sõnede teisendamine õigeks andmetüübiks:**
  - Nii `req.params` kui `req.query` väärtused on **alati sõned**. ID-d tuleb teisendada numbriks:
  ```js
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
  ```

- **Miks sõne `"false"` on JavaScriptis tõene (*truthy*)?**
  - JavaScriptis on kõik mittetühjad sõned tõesed. Seega `"false"` on tõene, sest see on mittetühi sõne. Seetõttu ei tohi kirjutada:
  ```js
  // ❌ Vale – "false" on truthy!
  if (req.query.completed) { ... }

  // ✅ Õige – võrrelda sõnena
  if (req.query.completed === "true") { ... }
  ```

- **Kehtiva ID käsitlemine, mida ei eksisteeri:**
  - Kui ID on kehtiv number, aga sellist ülesannet pole, tagastada `404`:
  ```js
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  ```

### 2. Koodilahendus:

```js
// src/app.js (GET marsruutide osa)
let tasks = [
  { id: 1, title: "Õpi Node.js-i", completed: false },
  { id: 2, title: "Harjuta Expressi", completed: true },
  { id: 3, title: "Loo API", completed: false },
];

// GET /api/tasks ja GET /api/tasks?completed=true|false
app.get("/api/tasks", (req, res) => {
  const { completed } = req.query;

  if (completed !== undefined) {
    if (completed !== "true" && completed !== "false") {
      return res
        .status(400)
        .json({ error: "completed must be 'true' or 'false'" });
    }
    const isCompleted = completed === "true";
    return res.json(tasks.filter((t) => t.completed === isCompleted));
  }

  res.json(tasks);
});

// GET /api/tasks/:id
app.get("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid task ID" });
  }

  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});
```

### 3. Levinud viga ja lahendus:

- **Viga:** `req.params.id` otse numbritega võrdlemine ilma teisendamata:
  ```js
  const task = tasks.find((t) => t.id === req.params.id); // ❌ Alati undefined!
  // sest "2" !== 2 (sõne vs number)
  ```
- **Lahendus:** Teisendada numbriks:
  ```js
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id); // ✅
  ```

### 4. Seos Task Trackeriga:

GET marsruudid on Task Trackeri aluseks – React frontend küsib nende kaudu ülesandeid kuvamiseks ja filtreerimiseks.

---

## Teema 7: POST marsruudid, päringukeha ja valideerimine

### 1. Uurimisküsimused ja vastused:

- **Ressursi loomine `POST` meetodiga:**
  - `POST /api/tasks` loob uue ülesande. Andmed saadetakse päringu kehas (*request body*) JSON formaadis.

- **`express.json()` vahevara:**
  - Express ei parsi automaatselt JSON-keha. Vahevara `express.json()` tuleb lisada, et `req.body` sisaldaks parsitud objekti:
  ```js
  app.use(express.json());
  ```

- **`Content-Type: application/json`:**
  - Klient peab päringule kaasa panema päise `Content-Type: application/json`, et server teaks, et keha on JSON formaadis.

- **`req.body` lugemine:**
  - Pärast `express.json()` vahevara lisamist on `req.body` JavaScripti objekt:
  ```js
  app.post("/api/tasks", (req, res) => {
    const { title } = req.body;
  });
  ```

- **Miks backend peab andmeid valideerima, isegi kui React juba valideerib?**
  - Frontend valideerimise saab lihtsalt mööda minna (nt cURL, Postman, brauseri arendajatööriistad). Backend on viimane kaitseliin – ta peab **alati** kontrollima, et andmed on korrektsed, olenemata kliendist.

- **ID genereerimine serveris:**
  - Serveris genereeritakse unikaalsed ID-d, sest klient ei saa teada, millised ID-d on juba kasutusel:
  ```js
  const newId =
    tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  ```

### 2. Koodilahendus:

```js
// POST /api/tasks
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  // Valideerimine
  if (title === undefined || typeof title !== "string") {
    return res.status(400).json({ error: "Title is required and must be a string" });
  }

  const trimmedTitle = title.trim();
  if (trimmedTitle === "") {
    return res.status(400).json({ error: "Title cannot be empty or whitespace-only" });
  }

  // Uue ülesande loomine
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    title: trimmedTitle,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});
```

Testimine cURL-iga:
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "  Learn Express  "}'
# Vastus: {"id":4,"title":"Learn Express","completed":false}
```

### 3. Levinud viga ja lahendus:

- **Viga:** `express.json()` unustamine – `req.body` on `undefined`:
  ```js
  app.post("/api/tasks", (req, res) => {
    console.log(req.body); // undefined!
  });
  ```
- **Lahendus:** Lisada vahevara enne marsruute:
  ```js
  app.use(express.json());
  ```

### 4. Seos Task Trackeriga:

POST marsruut võimaldab React frontendil saata uusi ülesandeid serverisse. Serveri valideeerimine tagab, et andmebaasi jõuavad ainult korrektsed andmed.

---

## Teema 8: PATCH ja DELETE marsruudid

### 1. Uurimisküsimused ja vastused:

- **Ressursi osaline uuendamine `PATCH` meetodiga:**
  - `PATCH` uuendab ainult need väljad, mis on päringu kehas esitatud. Erinevalt `PUT` meetodist ei nõua `PATCH` kogu ressursi saatmist.

- **Ressursi kustutamine `DELETE` meetodiga:**
  - `DELETE /api/tasks/:id` eemaldab konkreetse ülesande. Edukas kustutamine tagastab tühja vastuse.

- **Ülesande leidmine ID järgi:**
  ```js
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  ```

- **Esitatud väljade valideerimine:**
  - PATCH peaks kontrollima, et saadetud väljad on lubatud ja õiges formaadis. Tundmatuid välju tuleks ignoreerida või tagasi lükata.

- **Miks `204` vastuse keha on tühi?**
  - HTTP standard ütleb, et `204 No Content` vastus ei tohi sisaldada keha. See tähendab, et operatsioon õnnestus, aga kliendile ei saadeta midagi tagasi.

### 2. Koodilahendus:

```js
// PATCH /api/tasks/:id
app.patch("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid task ID" });
  }

  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, completed } = req.body;

  // Vähemalt üks väli peab olema
  if (title === undefined && completed === undefined) {
    return res
      .status(400)
      .json({ error: "At least one field (title or completed) is required" });
  }

  // Pealkirja valideerimine
  if (title !== undefined) {
    if (typeof title !== "string") {
      return res.status(400).json({ error: "Title must be a string" });
    }
    const trimmed = title.trim();
    if (trimmed === "") {
      return res.status(400).json({ error: "Title cannot be empty" });
    }
    task.title = trimmed;
  }

  // Completed valideerimine
  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      return res.status(400).json({ error: "Completed must be a boolean" });
    }
    task.completed = completed;
  }

  res.json(task);
});

// DELETE /api/tasks/:id
app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid task ID" });
  }

  const taskIndex = tasks.findIndex((t) => t.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).end();
});
```

### 3. Levinud viga ja lahendus:

- **Viga:** DELETE vastusesse JSON keha lisamine koos koodiga `204`:
  ```js
  res.status(204).json({ message: "Deleted" }); // ❌ Keha ignoreeritakse!
  ```
- **Lahendus:** Kasutada `204` ilma kehata:
  ```js
  res.status(204).end(); // ✅
  ```

### 4. Seos Task Trackeriga:

PATCH võimaldab ülesande pealkirja muuta ja olekut (tehtud/tegemata) lülitada. DELETE võimaldab ülesandeid eemaldada. Need on CRUD-operatsioonide viimased osad.

---

## Teema 9: Vahevara (*middleware*) ja järjepidev veakäsitlus

### 1. Uurimisküsimused ja vastused:

- **Mis on vahevara ja miks selle järjekord on oluline?**
  - Vahevara (*middleware*) on funktsioon, millel on juurdepääs päringule (`req`), vastusele (`res`) ja järgmisele vahevarale (`next`). Vahevara töödeldakse järjekorras, nagu need on koodis registreeritud. Kui logimise vahevara on enne marsruute, logitakse kõiki päringuid; kui pärast, ei logita midagi.

- **`next()` funktsioon:**
  - Kutsub välja järgmise vahevara ahelas. Ilma `next()` kutsumata jääb päring "rippuma" ja klient ei saa vastust.
  ```js
  function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next(); // edasi järgmisesse vahevarasse/marsruuti
  }
  ```

- **Päringu logimine:**
  ```js
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
  ```

- **Vahevara marsruutidele, mida ei eksisteeri (*404 handler*):**
  - Paigutatakse **pärast** kõiki marsruute. Kui ükski marsruut ei sobinud, jõutakse siia:
  ```js
  app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
  });
  ```

- **Expressi veakäsitluse vahevara (*error-handling middleware*):**
  - Veakäsitluse vahevaral on **neli** parameetrit: `(err, req, res, next)`. See püüab kinni vead, mille marsruut edastab `next(err)` kaudu:
  ```js
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal server error" });
  });
  ```

- **Valideerimivead vs ootamatud serverivead:**
  - **Valideerimivead** (`400`): Kliendi süü – vale sisend, puuduv väli. Tagastatakse selge veateade.
  - **Ootamatud vead** (`500`): Serveri süü – programmiviga, andmebaasi krahh. Tagastatakse üldine teade, **mitte** *stack trace*.

### 2. Koodilahendus:

```js
// src/app.js – vahevara järjekord

import express from "express";
const app = express();

// 1. JSON parsija
app.use(express.json());

// 2. Päringu logimine
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 3. Marsruudid (GET, POST, PATCH, DELETE)
// ... (varasemad marsruudid)

// 4. Tundmatu marsruut (404)
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.url} not found` });
});

// 5. Veakäsitlus (500)
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
```

### 3. Levinud viga ja lahendus:

- **Viga:** Veakäsitluse vahevara ainult kolme parameetriga – Express ei tunne seda veakäsitlejana:
  ```js
  app.use((err, req, res) => { ... }); // ❌ Express vajab 4 parameetrit!
  ```
- **Lahendus:** Alati lisada kõik neli parameetrit:
  ```js
  app.use((err, req, res, next) => { ... }); // ✅
  ```

### 4. Seos Task Trackeriga:

Järjepidev veakäsitlus tagab, et Task Tracker API tagastab alati sama formaadis veateateid (`{ "error": "..." }`), olenemata vea tüübist. See lihtsustab frontendi veakäsitlust.

---

## Teema 10: Reacti ühendamine Node.js-iga

### 1. Uurimisküsimused ja vastused:

- **Frontend ja backend kui eraldi protsessid:**
  - React (frontend) jookseb arenduses Vite serveriga (nt port 5173). Express (backend) jookseb eraldi protsessina (nt port 3000). Need on kaks täiesti iseseisvat programmi.

- **Erinevad päritolud (*origins*) ja CORS:**
  - **Päritolu** (*origin*) koosneb protokollist, domeenist ja pordist: `http://localhost:5173`.
  - Kui frontend ja backend on erinevatel portidel, kehtib **CORS** (*Cross-Origin Resource Sharing*) poliitika – brauser blokeerib päringud teise päritoluga serverile, kui server seda lubust ei anna.
  - Lahendus: installida ja kasutada `cors` paketti:
  ```bash
  npm install cors
  ```
  ```js
  import cors from "cors";
  app.use(cors({ origin: "http://localhost:5173" }));
  ```

- **Lubatud frontendi päritolu seadistamine backendis:**
  - Turvaline on määrata konkreetne päritolu, mitte `*` (kõik):
  ```js
  app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
  ```

- **Vite keskkonnamuutujad ja `VITE_API_URL`:**
  - Vite'is peavad frontendi keskkonnamuutujad algama prefiksiga `VITE_`:
  ```
  # .env
  VITE_API_URL=http://localhost:3000
  ```
  - Kasutamine koodis: `import.meta.env.VITE_API_URL`

- **Miks paigaldatud frontend ei saa kasutada localhost-i:**
  - Tootmises jookseb frontend kasutaja brauseris. `localhost` viitab kasutaja enda arvutile, mitte serveri arvutile. Seetõttu peab `VITE_API_URL` viitama avalikule serveri aadressile (nt `https://api.example.com`).

- **Miks keskkonnamuutuja muutmine nõuab taasehitamist:**
  - Vite kompileerib `VITE_` muutujad otse JavaScripti koodi sisse ehituse (*build*) ajal. Muutuja muutmine `.env` failis pärast ehitust ei muuda juba kompileeritud koodi.

- **JSON andmete saatmine `fetch`-iga:**
  ```js
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "New Task" }),
  });
  ```

### 2. Koodilahendus:

```js
// src/services/taskApi.js (frontend)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getTasks() {
  const response = await fetch(`${API_URL}/api/tasks`);
  if (!response.ok) throw new Error("Failed to fetch tasks");
  return response.json();
}

export async function createTask(title) {
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Failed to create task");
  }
  return response.json();
}
```

### 3. Levinud viga ja lahendus:

- **Viga:** CORS-i pakett lisamata – brauser blokeerib päringu:
  ```
  Access to fetch at 'http://localhost:3000/api/tasks' from origin
  'http://localhost:5173' has been blocked by CORS policy
  ```
- **Lahendus:** Lisada `cors` backendile:
  ```js
  import cors from "cors";
  app.use(cors({ origin: "http://localhost:5173" }));
  ```

### 4. Seos Task Trackeriga:

See on hetk, kus Task Tracker saab tõeliseks fullstack-rakenduseks – React frontend laadib ja saadab andmeid Express backendist, selle asemel et kasutada kohalikku `tasks.json` faili.

---

## Teema 11: Automatiseeritud API testid ja korratavad testandmed

### 1. Uurimisküsimused ja vastused:

- **Mida API integratsioontest kontrollib?**
  - API test saadab HTTP päringu serverile ja kontrollib, et vastus on oodatud: õige olekukood, õige JSON keha, õiged andmed. See testib kogu ahela (marsruut → loogika → vastus) üheskoos.

- **Vitest ja Supertest:**
  - **Vitest**: Kiire JavaScripti testiraamistik (sarnane Jest-ile), mis toetab ES-mooduleid ja on Vite'iga hästi integreeritud.
  - **Supertest**: Teek, mis võimaldab testides HTTP päringuid saata Express `app` objektile ilma serverit käivitamata.
  ```bash
  npm install --save-dev vitest supertest
  ```

- **Olekukoodide ja vastuse keha kontrollimine:**
  ```js
  import request from "supertest";

  const response = await request(app).get("/api/tasks");
  expect(response.status).toBe(200);
  expect(response.body).toBeInstanceOf(Array);
  ```

- **Kehtivate ja kehtetute sisendite testimine:**
  - Testitakse nii "õnnelikku rada" (*happy path*) kui ka vigaseid olukordi:
  ```js
  // Kehtiv sisend
  const res = await request(app)
    .post("/api/tasks")
    .send({ title: "Test" });
  expect(res.status).toBe(201);

  // Kehtetu sisend
  const res2 = await request(app)
    .post("/api/tasks")
    .send({ title: "" });
  expect(res2.status).toBe(400);
  ```

- **Miks testid peavad alustama ennustatavate andmetega?**
  - Kui testid jagavad andmeid, siis ühe testi muudatused (nt DELETE) mõjutavad teist testi. Igal testil peab olema oma "puhas" lähteseisund, et testid oleksid üksteisest sõltumatud ja saaksid töötada mis tahes järjekorras.

- **Miks `app` eksporditakse eraldi `app.listen()`-ist?**
  - Supertest kasutab otse `app` objekti ilma serverit käivitamata. Kui `listen()` on `app` failis, käivitataks iga testi ajal uus server, mis tekitab pordikonflite.

### 2. Koodilahendus:

```js
// tests/tasks.test.js
import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../src/app.js";

// Eeldame, et app.js ekspordib ka resetTasks funktsiooni
// või et testides on võimalik andmeid lähtestada

describe("Task API", () => {
  // GET testid
  it("GET /api/tasks returns all tasks", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // POST kehtiv sisend
  it("POST /api/tasks creates a valid task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "Test Task" });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Test Task");
    expect(res.body.completed).toBe(false);
    expect(res.body.id).toBeDefined();
  });

  // POST kehtetu sisend
  it("POST /api/tasks rejects an empty title", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "   " });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  // Tundmatu ülesanne
  it("GET /api/tasks/9999 returns 404", async () => {
    const res = await request(app).get("/api/tasks/9999");
    expect(res.status).toBe(404);
  });

  // DELETE
  it("DELETE /api/tasks/:id removes a task", async () => {
    // Kõigepealt loo ülesanne
    const createRes = await request(app)
      .post("/api/tasks")
      .send({ title: "To be deleted" });
    const taskId = createRes.body.id;

    // Kustuta
    const deleteRes = await request(app).delete(`/api/tasks/${taskId}`);
    expect(deleteRes.status).toBe(204);

    // Kontrolli, et enam pole
    const getRes = await request(app).get(`/api/tasks/${taskId}`);
    expect(getRes.status).toBe(404);
  });
});
```

### 3. Levinud viga ja lahendus:

- **Viga:** Testide sõltuvus üksteisest – üks test kustutab andmeid, teine eeldab nende olemasolu:
  ```js
  it("deletes task 1", ...);  // Kustutab task 1
  it("gets task 1", ...);     // ❌ Ebaõnnestub, sest task 1 on kustutatud!
  ```
- **Lahendus:** `beforeEach` taastab andmed enne igat testi:
  ```js
  beforeEach(() => {
    resetTasks(); // Taasta algandmed
  });
  ```

### 4. Seos Task Trackeriga:

Automatiseeritud testid tagavad, et Task Tracker API töötab korrektselt ka pärast koodimuudatusi. Need annavad kindluse, et uued funktsioonid ei lõhu olemasolevat funktsionaalsust.

---

## Teema 12: Ülesannete salvestamine JSON-faili

### 1. Uurimisküsimused ja vastused:

- **Miks mälus olevad andmed kaovad taaskäivitamisel?**
  - Massiiv `let tasks = [...]` eksisteerib ainult Node.js protsessi mälus. Kui server sulgeda (`Ctrl+C`) ja uuesti käivitada, luuakse muutuja uuesti algväärtusega. Kõik vahepeal lisatud/muudetud andmed on kadunud.

- **Lugemine ja kirjutamine mooduliga `node:fs/promises`:**
  ```js
  import { readFile, writeFile } from "node:fs/promises";

  // Lugemine
  const data = await readFile("./data/tasks.json", "utf-8");
  const tasks = JSON.parse(data);

  // Kirjutamine
  await writeFile("./data/tasks.json", JSON.stringify(tasks, null, 2));
  ```

- **`JSON.parse()` ja `JSON.stringify()`:**
  - `JSON.parse(text)`: Teisendab JSON-teksti JavaScripti objektiks/massiiviks.
  - `JSON.stringify(obj, null, 2)`: Teisendab JS objekti JSON-tekstiks. `null` on asendaja (*replacer*) ja `2` on taanduse suurus (loetavuse jaoks).

- **Puuduva või vigase faili käsitlus:**
  - Kui faili pole, tuleb luua tühi massiiv või uus fail.
  - Kui faili sisu pole kehtiv JSON, tekib `SyntaxError`.

- **Miks samaagsed failkirjutused vajavad ettevaatust:**
  - Kui kaks päringut kirjutavad samal ajal samasse faili, võib ühe muudatus kaotsi minna (*race condition*). Suurema rakenduse korral kasutatakse andmebaasi.

- **Miks andmebaas on suurema rakenduse jaoks parem?**
  - Andmebaas lahendab samaaegsuse, otsingu ja skaleeruvuse probleemid. JSON-fail sobib ainult väikese prototüübi jaoks.

### 2. Koodilahendus:

```js
// src/fileStorage.js
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

export async function loadTasks(filePath) {
  try {
    const data = await readFile(filePath, "utf-8");
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) {
      throw new Error("Tasks file does not contain an array");
    }
    return parsed;
  } catch (err) {
    if (err.code === "ENOENT") {
      return []; // Fail puudub – tagasta tühi massiiv
    }
    throw err; // Muu viga – edasta edasi
  }
}

export async function saveTasks(filePath, tasks) {
  const dir = path.dirname(filePath);
  await mkdir(dir, { recursive: true });
  await writeFile(filePath, JSON.stringify(tasks, null, 2));
}
```

```js
// src/server.js
import app from "./app.js";
import { loadTasks, saveTasks } from "./fileStorage.js";

const TASKS_FILE = "./data/tasks.json";
const PORT = 3000;

const tasks = await loadTasks(TASKS_FILE);
console.log(`Loaded ${tasks.length} tasks from ${TASKS_FILE}`);

// ... anna tasks massiiv app-ile

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

### 3. Levinud viga ja lahendus:

- **Viga:** Unustada kaust luua enne faili kirjutamist:
  ```js
  await writeFile("./data/tasks.json", ...); // ❌ ENOENT, kui data/ kausta pole
  ```
- **Lahendus:** Kasutada `mkdir` koos `recursive` lipuga:
  ```js
  await mkdir("./data", { recursive: true });
  await writeFile("./data/tasks.json", ...); // ✅
  ```

### 4. Seos Task Trackeriga:

JSON-faili salvestamine on lihtne viis tagada, et Task Tracker ülesanded säilivad serveri taaskäivitamisel. See on esimene samm andmete püsivuse suunas (enne andmebaasile üleminekut).

---

## Teema 13: Keskkonnamuutujad ja backendi konfigureerimine

### 1. Uurimisküsimused ja vastused:

- **Mis on keskkonnamuutuja (*environment variable*)?**
  - Keskkonnamuutuja on operatsioonisüsteemi tasemel määratud võti-väärtuse paar, millele programm saab käituse ajal ligi pääseda. See võimaldab seadistada rakendust ilma koodi muutmata.

- **Kuidas Node.js loeb väärtusi `process.env` kaudu?**
  ```js
  const port = process.env.PORT;
  console.log(port); // nt "3000"
  ```
  - `process.env` on objekt, mis sisaldab kõiki keskkonnamuutujaid.

- **Miks keskkonnamuutujate väärtused on sõned?**
  - Kõik `process.env` väärtused on **alati sõned**. Kui vaja numbrit, tuleb teisendada:
  ```js
  const port = Number(process.env.PORT) || 3000;
  ```

- **Miks peaks konfiguratsioon olema rakenduse loogikast eraldatud?**
  - Sama kood peab töötama arenduses, testimises ja tootmises erinevate seadistustega. Konfiguratsiooni rakendusse kirjutamine tähendab koodi muutmist iga keskkonna jaoks.

- **`.env.example` ja miks saladused peavad Gitist väljas olema:**
  - **`.env`**: Sisaldab tegelikke seadistusi ja saladusi (nt paroolid, API-võtmed). Lisada `.gitignore` faili!
  - **`.env.example`**: Sisaldab seadistuste näiteid ilma tegelike saladuste. Committida Giti, et teised arendajad teaksid, mis muutujaid seadistada.
  ```
  # .env.example
  PORT=3000
  TASKS_FILE=./data/tasks.json
  ```

### 2. Koodilahendus:

```js
// src/config.js
import "dotenv/config"; // või kasutada õpetaja pakutud laadimisviisi

const config = {
  port: Number(process.env.PORT) || 3000,
  tasksFile: process.env.TASKS_FILE || "./data/tasks.json",
};

export default config;
```

```js
// src/server.js
import app from "./app.js";
import config from "./config.js";
import { loadTasks } from "./fileStorage.js";

const tasks = await loadTasks(config.tasksFile);

app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
  console.log(`Tasks file: ${config.tasksFile}`);
});
```

`.env.example`:
```
# Server port (default: 3000)
PORT=3000

# Path to the tasks data file (default: ./data/tasks.json)
TASKS_FILE=./data/tasks.json
```

`.env`:
```
PORT=3000
TASKS_FILE=./data/tasks.json
```

`.gitignore` (lisada):
```
.env
```

### 3. Levinud viga ja lahendus:

- **Viga:** Port jäetakse sõnena – `app.listen("3000")` töötab, aga numbriline võrdlus ebaõnnestub:
  ```js
  const port = process.env.PORT; // "3000" (sõne!)
  if (port > 1000) { ... } // Töötab juhuslikult, aga on ohtlik
  ```
- **Lahendus:** Alati teisendada:
  ```js
  const port = Number(process.env.PORT) || 3000;
  ```

### 4. Seos Task Trackeriga:

Sama Task Tracker backend saab töötada erinevates keskkondades (arendus, testimine, tootmine) ilma koodi muutmata – piisab keskkonnamuutujate seadistamisest.

---

## Teema 14: Puuduva ja rikutud andmefaili käsitlemine

### 1. Uurimisküsimused ja vastused:

- **`async`, `await` ja `try/catch` lühike kordamine:**
  - **`async`**: Märgib funktsiooni asünkroonseks – see tagastab alati `Promise`.
  - **`await`**: Ootab `Promise` tulemust. Saab kasutada ainult `async` funktsiooni sees.
  - **`try/catch`**: Püüab kinni nii sünkroonsed kui ka `await`-iga oodatud asünkroonsed vead.
  ```js
  async function loadData() {
    try {
      const data = await readFile("file.json", "utf-8");
      return JSON.parse(data);
    } catch (err) {
      console.error("Error:", err.message);
    }
  }
  ```

- **Puuduva faili ja vigase JSON-i erinevus:**
  - **Puuduv fail**: `readFile` viskab vea koodiga `ENOENT` (*Error NO ENTry*). See on normaalne olukord (nt esimene käivitus).
  - **Vigane JSON**: `JSON.parse` viskab `SyntaxError`. See tähendab, et fail on rikutud ja vajab inimese sekkumist.

- **Kuidas veakood `ENOENT` identifitseerib puuduvat faili?**
  ```js
  try {
    const data = await readFile(filePath, "utf-8");
  } catch (err) {
    if (err.code === "ENOENT") {
      // Faili pole – normaalne, tagasta tühi massiiv
      return [];
    }
    throw err; // Muu viga – edasta edasi!
  }
  ```

- **Miks muid vigu ei tohi vaikselt tühja massiivina tagastada?**
  - Kui nt failisüsteemi õigused on valed (`EACCES`), siis tühja massiivi tagastamine varjaks tõsist probleemi ja kasutaja andmed võiksid kaduda (järgmine salvestamine kirjutaks tühja massiivi).

- **Miks rikutud andmeid ei tohi automaatselt üle kirjutada?**
  - Kui fail sisaldab vigast JSON-i, võib see tähendada osalist andmekadu. Automaatne ülekirjutamine tühja massiiviga kustutaks ka need andmed, mida saaks käsitsi taastada.

### 2. Koodilahendus:

```js
// src/fileStorage.js – laiendatud loadTasks
import { readFile } from "node:fs/promises";

export async function loadTasks(filePath) {
  let data;

  // 1. Proovi faili lugeda
  try {
    data = await readFile(filePath, "utf-8");
  } catch (err) {
    if (err.code === "ENOENT") {
      // Fail puudub – tagasta tühi massiiv (normaalne esmakäivitusel)
      return [];
    }
    // Muu failisüsteemi viga (nt õigused) – edasta edasi
    throw err;
  }

  // 2. Proovi JSON parsida
  let parsed;
  try {
    parsed = JSON.parse(data);
  } catch (err) {
    throw new Error(
      `Corrupted data file at ${filePath}: invalid JSON. ` +
      `Please fix the file manually or restore from backup.`
    );
  }

  // 3. Kontrolli, et tulemus on massiiv
  if (!Array.isArray(parsed)) {
    throw new Error(
      `Invalid data file at ${filePath}: expected an array, ` +
      `got ${typeof parsed}. Please fix the file manually.`
    );
  }

  return parsed;
}
```

Kolme olukorra demonstreerimine:

```js
// demo.js
import { loadTasks } from "./src/fileStorage.js";

// 1. Kehtiv fail
try {
  const tasks = await loadTasks("./data/tasks.json");
  console.log("✅ Loaded tasks:", tasks);
} catch (err) {
  console.error("❌", err.message);
}

// 2. Puuduv fail
try {
  const tasks = await loadTasks("./data/nonexistent.json");
  console.log("✅ Missing file, got empty array:", tasks);
} catch (err) {
  console.error("❌", err.message);
}

// 3. Vigane JSON (loo test fail: echo "not json" > data/broken.json)
try {
  const tasks = await loadTasks("./data/broken.json");
  console.log("Tasks:", tasks);
} catch (err) {
  console.error("❌ Corrupted file:", err.message);
}
```

### 3. Levinud viga ja lahendus:

- **Viga:** Kõik vead püütakse kinni ja tagastatakse tühi massiiv:
  ```js
  // ❌ Ohtlik! Varjab rikutud andmeid
  try {
    const data = await readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return []; // Kaotab rikutud andmed!
  }
  ```
- **Lahendus:** Käsitle ainult `ENOENT` erijuhuna, muid vigu edasta:
  ```js
  // ✅ Turvaline
  catch (err) {
    if (err.code === "ENOENT") return [];
    throw err; // Muid vigu ei varja!
  }
  ```

### 4. Seos Task Trackeriga:

Backend käsitleb puuduvaid andmeid graatsiliselt (esimese käivituse korral), aga teavitab rikutud andmetest selge veaga, selle asemel et vaikselt kasutaja ülesandeid kustutada.

---

## Teema 15: Salvestamise ja laadimise testimine ajutise failiga

### 1. Uurimisküsimused ja vastused:

- **Miks peaksid testid vältima rakenduse tegelikku andmefaili?**
  - Testid lisavad, muudavad ja kustutavad andmeid. Kui testid kasutaksid sama `tasks.json` faili, mida kasutaja andmed sisaldavad, kirjutataks päris ülesanded üle. Samuti muudaks see testide tulemused ebausaldusväärseks, sest need sõltuksid kasutaja andmetest.

- **Mis on ajutine kataloog (*temporary directory*)?**
  - Operatsioonisüsteemi pakutav kaust (nt `/tmp` Linuxis, `%TEMP%` Windowsis), kuhu saab luua lühiajalisi faile. Node.js-is saab unikaalse ajutise kausta luua:
  ```js
  import { mkdtemp, rm } from "node:fs/promises";
  import { tmpdir } from "node:os";
  import path from "node:path";

  const tempDir = await mkdtemp(path.join(tmpdir(), "tasks-test-"));
  ```

- **Miks peavad testid kasutama oma andmeid?**
  - Iga test peab olema iseseisev ja korratav. Kui test sõltub välistest andmetest, võivad tulemused varieeruda masinate ja käivituskordade vahel.

- **Miks peab puhastus toimuma ka testi ebaõnnestumisel?**
  - Kui test ebaõnnestub (assertion viskab vea) ja ajutist kausta ei kustutata, kuhjuvad kettale prügifailid. `try/finally` tagab, et puhastus toimub alati:
  ```js
  try {
    // test
  } finally {
    await rm(tempDir, { recursive: true }); // Alati puhasta!
  }
  ```

### 2. Koodilahendus:

```js
// tests/fileStorage.test.js
import { describe, it, expect } from "vitest";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { loadTasks, saveTasks } from "../src/fileStorage.js";

describe("File Storage - save and load", () => {
  it("saves and loads tasks from a temporary file", async () => {
    // 1. Loo unikaalne ajutine kataloog
    const tempDir = await mkdtemp(path.join(tmpdir(), "tasks-test-"));
    const tempFile = path.join(tempDir, "tasks.json");

    try {
      // 2. Salvestav kaks ülesannet
      const originalTasks = [
        { id: 1, title: "Test Task 1", completed: false },
        { id: 2, title: "Test Task 2", completed: true },
      ];
      await saveTasks(tempFile, originalTasks);

      // 3. Laadi failist tagasi
      const loadedTasks = await loadTasks(tempFile);

      // 4. Kontrolli, et laaditud andmed kattuvad originaaliga
      expect(loadedTasks).toEqual(originalTasks);
      expect(loadedTasks).toHaveLength(2);
      expect(loadedTasks[0].title).toBe("Test Task 1");
      expect(loadedTasks[1].completed).toBe(true);
    } finally {
      // 5. Eemalda ajutine kataloog alati (ka testi ebaõnnestumisel)
      await rm(tempDir, { recursive: true, force: true });
    }
  });
});
```

Käivitamine:
```bash
npx vitest run tests/fileStorage.test.js
```

### 3. Levinud viga ja lahendus:

- **Viga:** Ajutise kausta puhastamine jäetakse `catch` plokki – kui testi keha viskab vea enne `catch`-i jõudmist:
  ```js
  // ❌ Kui expect ebaõnnestub, ei jõua siia
  try {
    // ... testid
    await rm(tempDir, { recursive: true });
  } catch {
    await rm(tempDir, { recursive: true });
  }
  ```
- **Lahendus:** Kasuta `finally`, mis käivitub alati:
  ```js
  try {
    // ... testid
  } finally {
    await rm(tempDir, { recursive: true, force: true }); // ✅ Alati
  }
  ```

### 4. Seos Task Trackeriga:

Automatiseeritud testid saavad kontrollida andmete püsivust (salvestamine ja laadimine) ilma, et kasutaja tegelikud ülesanded ohtu satuksid. See tagab, et failisüsteemi loogika töötab ka pärast koodimuudatusi.

---

## Kokkuvõte

Kõik vastused katavad Node.js backendi arenduse tervikpildi:

1. **Alused** (teemad 1–3): Node.js, npm, moodulid
2. **HTTP ja API** (teemad 4–8): Express, marsruudid, CRUD-operatsioonid
3. **Kvaliteet** (teemad 9, 11): Vahevara, veakäsitlus, testid
4. **Integreerimine** (teema 10): React + Express ühendamine
5. **Andmete püsivus** (teemad 12–15): Failisüsteem, konfiguratsioon, robustne laadimine, testid
