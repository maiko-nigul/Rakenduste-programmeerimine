# Tunnitöö #2: React – Teoreetilised vastused ja lahendused (VASTUSED.md)

See dokument sisaldab põhjalikke vastuseid kõikidele teemadele, uurimisküsimustele (*Research and explain*) ja esitluse nõuetele failist `README.md`.

---

## Iga grupi esitluse 5 põhiküsimust (What Every Presenting Group Must Explain)

1. **Mis on teema ja mis probleemi see lahendab?**
   - React võimaldab luua dünaamilisi, reaktiivseid kasutajaliideseid. See lahendab brauseri DOM-i käsitsi manipuleerimise ja olekuhalduse keerukuse probleemi, pakkudes deklaratiivset komponentpõhist lähenemist.
2. **Mida oluline süntaks tähendab?**
   - JSX ühendab HTML-i ja JS-i; `useState` hoiab muutuvat sisu mälus; `props` võimaldab andmeid jagada; `useEffect` sünkroonib väliste andmeallikatega; React Router haldab URL-e ilma lehte uuesti laadimata.
3. **Kuidas töötav näide käitub?**
   - Näiterakendus laadib ülesanded `tasks.json` failist, võimaldab uusi ülesandeid lisada, olekut muuta (tehtud/tegemata), nimekirja filtreerida, detaile vaadata (`/tasks/:id`) ja ülesandeid kustutada.
4. **Mis on üks levinud viga ja kuidas seda parandada?**
   - **Viga:** Oleku otse muutmine (mutatsioon), nt `tasks.push(newTask)` või `task.completed = true`. See ei käivita komponendi uuesti renderdamist (re-render) ja tekitab raskesti tuvastatavaid vigu.
   - **Lahendus:** Kasutada alati muutumatut (immutable) uuendamist: `setTasks([...tasks, newTask])` või `setTasks(tasks.map(t => ...))`.
5. **Kuidas see kontseptsioon aitab ehitada meie Task Trackerit?**
   - Terviklik Task Tracker koosnebki nendest osadest: vorm uue ülesande sisestamiseks, nimekiri ülesannete kuvamiseks ja filtreerimiseks, detailvaade info näitamiseks ning tulevikus taustaprogrammiga (Node.js API) suhtlemine.

---

## Osa 1: Reacti alused (Part 1: React Fundamentals)

---

### Teema 1: React, Vite ja esimese rakenduse loomine

#### 1. Uurimisküsimused ja vastused:
- **Mis on React?**
  - React on avatud lähtekoodiga JavaScripti teek (library) kasutajaliideste ehitamiseks, mida arendab Meta (Facebook). See põhineb deklaratiivsel programmeerimisel ja virtuaalsel DOM-il (Virtual DOM), mis teeb liidese värskendamise kiireks ja ennustatavaks.
- **Mis on komponent?**
  - Komponent on iseseisev, korduvkasutatav koodiplokk, mis vastutab kindla kasutajaliidese osa kuvamise ja käitumise eest. Reactis on komponent funktsioon, mis tagastab JSX märgistust (nt `<Header />` või `<TaskCard />`).
- **Mis on Vite?**
  - Vite on kaasaegne frontend-arendustööriist ja ehitaja (bundler). Erinevalt vanadest tööriistadest (nt Webpack / Create React App) kasutab Vite arenduse ajal brauseri natiivseid ES mooduleid (ESM), pakkudes peaaegu kohest serveri käivitumist ja kiiret kuum-moodulite asendust (HMR).
- **Mis rolli mängivad Node.js ja npm Reacti arendamisel?**
  - **Node.js**: JavaScripti käituskeskkond väljaspool brauserit, mis võimaldab kohalikus arvutis jooksutada arendustööriistu (Vite, transpileerijad, serverid).
  - **npm (Node Package Manager)**: Paketihaldur, mille abil paigaldatakse projekti vajalikud teegid (nt `react`, `react-router-dom`, `prettier`).
- **Oluliste failide selgitus:**
  - `package.json`: Projekti pass – sisaldab nime, skripte (`dev`, `build`), sõltuvusi (`dependencies`, `devDependencies`).
  - `node_modules`: Kaust, kuhu salvestatakse kõik npm-i kaudu alla laaditud teegid (seda ei lisata kunagi Giti).
  - `index.html`: Ühelehelise rakenduse (SPA) peamine HTML dokument, mis sisaldab konteinerit `<div id="root"></div>` ja impordib `src/main.jsx`.
  - `src/main.jsx`: Rakenduse käivituskoht, mis seob Reacti juure (`createRoot`) HTML-is oleva `#root` elemendiga ja renderdab `<App />`.
  - `src/App.jsx`: Rakenduse peakomponent, mis ühendab kõik alamkomponendid, olekud ja marsruudid.
- **Sõltuvuste paigaldamise vs arendusserveri käivitamise erinevus:**
  - `npm install`: Laeb internetist alla ja paigaldab projektile vajalikud pakettide failid kausta `node_modules`. Tehakse tavaliselt üks kord pärast koodi allalaadimist.
  - `npm run dev`: Käivitab kohaliku arendusserveri (tavaliselt pordil 5173), mis teenindab reaalajas faile ja uuendab brauserit koodi salvestamisel (HMR).

---

### Teema 2: Git töövoog, commit-konventsioonid ja Prettier

#### 1. Uurimisküsimused ja vastused:
- **`git status`, `git add`, `git commit` ja `git push`:**
  - `git status`: Näitab töökataloogi seisu (mis failid on muudetud, lisatud või jälgimata).
  - `git add <fail>`: Lisab muudatused ettevalmistusalasse (*staging area*).
  - `git commit -m "sõnum"`: Salvestab ettevalmistatud muudatused kohalikku ajalukku unikaalse kontrollsumma ja selgitava sõnumiga.
  - `git push`: Saadab kohalikud commitid kaughoidlasse (nt GitHubi).
- **Miks `node_modules` kausta ei tohi committida?**
  - See sisaldab tuhandeid faile ja sadu megabaite andmeid, mida pole vaja versioonihalduses hoida. Seda saab alati taastada käsuga `npm install`.
- **Miks `package-lock.json` peab committima?**
  - See lukustab iga allalaaditud teegi ja selle alamsõltuvuste täpsed versioonid ning räsid. See garanteerib, et kõigil tiimiliikmetel ja serveritel on identne koodibaas.
- **Angular-stiilis commit sõnumid (`type: description`):**
  - `feat`: Uue funktsionaalsuse lisamine (nt `feat: add task filtering`).
  - `fix`: Veaparandus (nt `fix: correct task id generation`).
  - `docs`: Dokumentatsiooni muudatused (nt `docs: update README`).
  - `style`: Koodi stiili ja vorminduse muudatused ilma loogikat muutmata (tühikud, semikoolonid).
  - `refactor`: Koodi ümberstruktureerimine ilma funktsiooni muutmata.
  - `chore`: Abitegevused, ehitusskriptid, pakettide uuendused (nt `chore: install prettier`).
- **Prettier VS Code laiendus ja seadistamine:**
  - Paigaldatakse "Prettier - Code formatter" laiendus. Seadetes määratakse `editor.defaultFormatter: "esbenp.prettier-vscode"` ja `editor.formatOnSave: true`.
- **`.prettierrc` ja `.prettierignore`:**
  - `.prettierrc`: Konfiguratsioonifail (nt `"semi": true, "singleQuote": true, "tabWidth": 2`).
  - `.prettierignore`: Loetleb failid ja kaustad, mida ei vormindata (`node_modules`, `dist`, `package-lock.json`).
- **Prettieri vormindus vs ESLinti / Oxlinti kontrollid:**
  - **Prettier**: Tegeleb rangelt visuaalse koodistiiliga (rea pikkus, tühikud, ülakomad).
  - **ESLint / Oxlint**: Tegeleb koodi kvaliteedi ja vigade leidmisega (kasutamata muutujad, võimalikud loogikavead, Reacti reeglite rikkumised).

---

### Teema 3: JSX, komponendid ja baas-stiilid

#### 1. Uurimisküsimused ja vastused:
- **JSX vs HTML:**
  - JSX näeb välja nagu HTML, kuid on JavaScripti süntaksilaiendus. Erinevused: atribuudid kirjutatakse kaameltähtedega (`camelCase`, nt `onClick`), `class` asemel kasutatakse `className`, `for` asemel `htmlFor`.
- **Suure algustähega komponentide nimed:**
  - React eristab tavalisi HTML elemente (nt `<div>`, `<button>`) ja Reacti komponente (nt `<Header>`, `<TaskCard>`) nime esimese tähe järgi. Väikese tähega sildid käsitletakse HTML-ina, suure tähega sildid viitavad funktsioonile/komponendile.
- **Iselõppevad sildid ja üks emapuu / Fragment:**
  - Kõik sildid peavad olema suletud (nt `<input />`, `<br />`). Komponent peab tagastama täpselt ühe juurelemendi. Kui lisamärgendit pole vaja, kasutatakse fragmenti: `<> ... </>` või `<React.Fragment> ... </React.Fragment>`.
- **JavaScript avaldised `{}` sees:**
  - Loogeliste sulgude sees saab käivitada suvalist JavaScripti avaldist, mis tagastab väärtuse: muutujad `{task.title}`, matemaatika `{2 + 2}`, funktsioonikutsed või tingimused.
- **`className` ja CSS importimine:**
  - Kuna `class` on JavaScriptis reserveeritud märksõna, kasutatakse atribuuti `className="task-card"`. CSS imporditakse otse faili: `import './App.css'`.
- **Komponentide eksport ja import:**
  - Nimega eksport: `export function Header() { ... }` -> `import { Header } from './Header';`
  - Vaikimisi eksport: `export default App;` -> `import App from './App';`

---

### Teema 4: Props ja korduvkasutatavad komponendid

#### 1. Uurimisküsimused ja vastused:
- **Andmete edastamine vanemalt lapsele:**
  - Vanemkomponent annab lapsele andmeid atribuutidena: `<TaskCard task={singleTask} />`.
- **Propside vastuvõtmine destruktureerimisega:**
  - Selle asemel, et kirjutada `function TaskCard(props) { return <div>{props.task.title}</div> }`, destruktureeritakse parameeter otse:
    `function TaskCard({ task, onToggle, onDelete }) { ... }`.
- **Erinevate andmetüüpide edastamine:**
  - Sõne: `title="Task Tracker"`
  - Tõeväärtus: `completed={true}`
  - Arv: `id={1}`
  - Objekt: `task={{ id: 1, title: 'Learn JSX', completed: true }}`
  - Funktsioon: `onToggle={handleToggle}`
- **Miks propsid on ainult loetavad (*read-only*)?**
  - React järgib ühesuunalist andmevoogu (*one-way data flow*). Laps ei tohi saadud propse muuta, sest see rikuks ettearvatavuse ja tekitaks sünkroniseerimisprobleeme teiste komponentidega. Kui andmeid on vaja muuta, kutsub laps välja vanema antud tagasikutsefunktsiooni (*callback*).
- **Sama komponendi kasutamine erinevate andmetega:**
  - `<TaskCard task={task1} />` ja `<TaskCard task={task2} />` kasutavad sama koodi, kuid kuvavad erinevat sisu.

---

### Teema 5: Sündmused, useState ja tingimuslik renderdamine

#### 1. Uurimisküsimused ja vastused:
- **`onClick` ja sündmusekäsitlejad:**
  - Sündmustele reageerimiseks määratakse funktsioon: `onClick={handleClick}` või noolfunktsioon `onClick={() => onToggle(task.id)}`.
- **Funktsiooni edastamise vs kohese väljakutsumise erinevus:**
  - **Õige (edastamine):** `onClick={handleClick}` või `onClick={() => handleClick(id)}`. Funktsioon käivitatakse alles nupule klikkides.
  - **Vale (väljakutsumine renderdamisel):** `onClick={handleClick()}`. Funktsioon kutsutakse välja kohe, kui komponenti renderdatakse, mis tekitab lõputu tsükli, kui see muudab olekut!
- **Olek (*state*) vs tavaline muutuja:**
  - Tavalise muutuja (`let count = 0`) väärtuse muutmine ei käivita kasutajaliidese värskendamist ja järgmisel renderdamisel taastub selle esialgne väärtus.
  - `useState` salvestab väärtuse Reacti sisesesse mällu ja selle muutmine teavitab Reacti vajadusest komponent uuesti renderdada.
- **`useState` ja seadistusfunktsioon (*setter*):**
  - `const [filter, setFilter] = useState('all');`
  - Väärtust uuendatakse käsuga `setFilter('completed')`.
- **Eelmisel olekul põhinev uuendamine (*functional update*):**
  - Kui uus olek sõltub vanast (nt loendur või massiiv), kasutatakse funktsiooni:
    `setCount(prevCount => prevCount + 1)`
- **Hookide reeglid:**
  - Hooke (nt `useState`, `useEffect`) tohib kutsuda välja ainult Reacti funktsioonkomponendi kõige kõrgemal tasemel (mitte `if` lausete, tsüklite ega pesastatud funktsioonide sees).
- **Tingimuslik renderdamine:**
  - Ternary operaator: `{task.completed ? 'Completed' : 'Not completed'}`
  - Loogiline JA (`&&`): `{error && <p className="error">{error}</p>}`
  - `if`-lause enne tagastust:
    ```jsx
    if (!task) return <p>Task not found</p>;
    ```

---

### Teema 6: Nimekirjad, võtmed ja filtreerimine

#### 1. Uurimisküsimused ja vastused:
- **Objektide renderdamine `.map()` abil:**
  ```jsx
  tasks.map(task => <TaskCard key={task.id} task={task} />)
  ```
- **Miks React vajab võtmeid (`key`)?**
  - Võti võimaldab Reactil tuvastada, millised elemendid on nimekirjas lisatud, eemaldatud või ümber järjestatud. See tagab virtuaalse DOM-i kiire ja täpse uuendamise.
- **Miks stabiilsed ID-d on sobivad võtmed?**
  - Unikaalne ja püsiv `id` (nt andmebaasi või objekti ID) säilitab seose elemendiga ka siis, kui nimekirja filtreeritakse või sorteeritakse. Massiivi indeksit (`index`) ei soovitata võtmeks kasutada, sest järjekorra muutumisel lähevad komponendi sisesed olekud valedesse kohtadesse.
- **Filtreerimine `.filter()` abil:**
  ```javascript
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true; // 'all'
  });
  ```
- **Filtrivaliku hoidmine olekus ja arvutuslik filtreerimine:**
  - Olekus hoitakse ainult filtri valikut (`const [filter, setFilter] = useState('all')`), mitte eraldi koopiat filtreeritud nimekirjast. Filtreeritud nimekiri arvutatakse igal renderdamisel olemasoleva `tasks` massiivi põhjal. See väldib andmete dubleerimist ja sünkroonist väljumist.
- **Tühja nimekirja teade:**
  ```jsx
  {filteredTasks.length === 0 ? <p>No tasks found</p> : ...}
  ```

---

### Teema 7: Kontrollitud vormid ja valideerimine

#### 1. Uurimisküsimused ja vastused:
- **Kontrollitud sisendid (*controlled inputs*):**
  - Sisendi väärtust juhib Reacti olek: `<input value={title} onChange={(e) => setTitle(e.target.value)} />`.
- **`event.target.value`:**
  - Loeb sündmuse objektist klaviatuurilt sisestatud teksti hetkeväärtuse.
- **`onSubmit` ja `event.preventDefault()`:**
  - Vormi esitamisel brauseri tavapärane käitumine on lehe uuesti laadimine (refresh). `event.preventDefault()` peatab selle, võimaldades Reactil tegeleda andmetega ilma lehte laadimata.
- **Sildi sidumine sisendiga:**
  - `<label htmlFor="task-input">Task Title</label>` seotakse elemendiga `<input id="task-input" />`. See parandab ligipääsetavust (ekraanilugejad) ja võimaldab sildile klikkides sisendvälja aktiveerida.
- **Sisendi trimmimine ja tühjade pealkirjade tagasilükkamine:**
  ```javascript
  const trimmed = title.trim();
  if (!trimmed) {
    setError('Task title cannot be empty.');
    return;
  }
  ```
- **Vormi tühjendamine:**
  - Pärast edukat lisamist tehakse `setTitle('')`, mis tühjendab sisendvälja.

---

### Teema 8: Ühine olek ja ülesannete lisamine, uuendamine ja kustutamine

#### 1. Uurimisküsimused ja vastused:
- **Oleku tõstmine ühisesse vanemasse (*lifting state up*):**
  - Kui mitu komponenti vajavad samu andmeid (nt `TaskForm` peab lisama ja `TaskList` kuvama), tõstetakse olek nende lähimasse ühisesse esivanemasse (`App.jsx`).
- **Andmete ja tagasikutsete edastamine alla:**
  - Vanem annab lapsele `tasks` andmed ja funktsioonid `onAddTask`, `onToggle`, `onDelete`.
- **Miks olekumassiive ja -objekte ei tohi otse muuta?**
  - React võrdleb eelmist ja uut olekut viite (viiteaadressi) järgi (`prev === next`). Kui objekti otse muuta (muteerida), on viide sama ja React ei saa aru, et sisu muutus, mistõttu ekraan ei uuene.
- **Lisamine `spread` süntaksiga:**
  ```javascript
  setTasks(prev => [...prev, newTask]);
  ```
- **Uuendamine `.map()` abil:**
  ```javascript
  setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  ```
- **Kustutamine `.filter()` abil:**
  ```javascript
  setTasks(prev => prev.filter(t => t.id !== id));
  ```
- **Unikaalne täisarvuline ID:**
  ```javascript
  const nextId = prev.length > 0 ? Math.max(...prev.map(t => t.id)) + 1 : 1;
  ```

---

### Teema 9: React Router ja ülesande detailvaade

#### 1. Uurimisküsimused ja vastused:
- **Kliendipoolne marsruutimine (*client-side routing*):**
  - Rakendus vahetab kuvatavat vaadet vastavalt brauseri URL-ile ilma täielikku lehepäringut veebiserverisse tegemata.
- **React Routeri paigaldamine ja struktuur:**
  - Teek: `react-router-dom`. Rakendus mähitakse ruuteri sisse (`<HashRouter>` või `<BrowserRouter>`), mille sees on `<Routes>` ja üksikud `<Route path="..." element={<Component />} />`.
- **`Link` ja `NavLink` vs tavaline `<a>`:**
  - Tavaline `<a href="...">` laeb kogu veebilehe nullist uuesti. `<Link to="...">` ja `<NavLink to="...">` muudavad URL-i ilma lehe taaslaadimiseta. `NavLink` lisab automaatselt `active` klassi aktiivsele lingile.
- **`BrowserRouter` vs `HashRouter`:**
  - `BrowserRouter`: Kasutab puhtaid URL-e (nt `/tasks/1`). Nõuab serveri tuge, mis suunab kõik päringud `index.html`-i peale.
  - `HashRouter`: Kasutab trellimärki (nt `/#/tasks/1`). Töötab suurepäraselt staatilistes majutuskeskkondades nagu GitHub Pages, kus serveripoolset ümbersuunamist ei saa konfigureerida.
- **Dünaamilised teed ja `useParams`:**
  - Teekond: `<Route path="/tasks/:taskId" element={<TaskDetailPage />} />`.
  - Komponendis: `const { taskId } = useParams();`.
- **URL-i parameetrid on alati sõned (*strings*):**
  - `taskId` on sõne (nt `"1"`). Enne võrdlemist numbrilise ID-ga tuleb see teisendada: `Number(taskId)` või `parseInt(taskId, 10)`.
- **Tundmatud teed ja puuduvad ülesanded:**
  - Tundmatute URL-ide jaoks on universaalne püüdmistee `<Route path="*" element={<NotFoundPage />} />`.
  - Kui ülesannet antud ID-ga ei leita, kuvatakse selge teade "Task not found" ja link tagasi nimekirja.

---

### Teema 10: useEffect, andmete laadimine ja API teenus

#### 1. Uurimisküsimused ja vastused:
- **Mis on API?**
  - Rakendusliides (Application Programming Interface), mille kaudu frontend saab küsida andmeid ja saata muudatusi serverile (nt JSON formaadis).
- **Andmete toomine `fetch` ja `async/await` abil:**
  ```javascript
  const response = await fetch(url);
  if (!response.ok) throw new Error('Viga');
  const data = await response.json();
  ```
- **`response.ok` kontroll:**
  - `fetch` ei viska viga HTTP veakoodide (nt 404 või 500) puhul, vaid ainult võrgukatkestuse korral. Seetõttu peab käsitsi kontrollima `if (!response.ok)`.
- **`useEffect` välise andmeallikaga sünkroniseerimiseks:**
  - Võimaldab käivitada kõrvalmõjusid (*side effects*), näiteks andmete pärimist serverist pärast komponendi ekraanile ilmumist.
- **Sõltuvuste massiiv (*dependency array*) ja puhastus (*cleanup*):**
  - Tühi massiiv `[]` tähendab, et efekt käivitatakse ainult üks kord pärast komponendi esmast paigaldamist (*mount*).
  - Puhastusfunktsioon tagastatakse efekti seest (nt `AbortController.abort()`). See peatab poolelioleva päringu, kui komponent eemaldatakse või andmed muutuvad enne päringu saabumist, hoides ära aegunud andmete sattumise liidesesse.
- **Neli peamist olekut andmete laadimisel:**
  1. *Loading*: Andmeid laetakse (kuvatakse laadimisteade või vurrkett).
  2. *Error*: Päring ebaõnnestus (kuvatakse veateade ja uuesti proovimise võimalus).
  3. *Success*: Andmed laaditi edukalt (kuvatakse sisu).
  4. *Empty*: Päring õnnestus, aga nimekiri on tühi (kuvatakse teade "No tasks found").
- **Koodi hoidmine teenusefailis (*service file*):**
  - Funktsioon `getTasks` asub eraldi failis `src/services/taskApi.js`. See hoiab komponendid puhtad ja teeb andmepäringute asendamise (nt päris Node.js API vastu) ülilihtsaks.

---

### Teema 11: Tootmisehitus ja GitHub Pages paigaldus

#### 1. Uurimisküsimused ja vastused:
- **Arendus (*development*) vs tootmine (*production*):**
  - Arenduses on kood optimeerimata, lisatud on rohkelt veateateid, abikoode ja kuum-taaskäivitus (HMR).
  - Tootmises on kood kokku pakitud (*bundled*), minimeeritud (*minified*), üleliigsed logid eemaldatud ja failid optimeeritud võimalikult kiireks allalaadimiseks.
- **Ehituskäsud:**
  - `npm run build`: Kompileerib koodi ja loob valmis staatilised failid kausta `dist/`.
  - `npm run preview`: Käivitab kohaliku veebiserveri kaustas `dist/`, et testida tootmisversiooni enne avaldamist.
- **Vite'i `base` seadistus GitHub Pages jaoks:**
  - Kui projekt ei asu domeeni juures (nt `kasutaja.github.io/projekti-nimi/`), peab failiteed suhteliseks määrama. Failis `vite.config.js` määratakse: `base: './'`.
- **Miks `HashRouter` sobib hästi GitHub Pages keskkonda?**
  - GitHub Pages ei toeta serveripoolset URL-ide suunamist `index.html`-i faili. Kui kasutada tavalist `BrowserRouter`it ja kasutaja värskendab lehte `/tasks/1` peal, kuvab server 404 vea. `HashRouter` hoiab marsruuti trellide taga (`/#/tasks/1`), mida veebiserver ei tõlgenda eraldi failina.
- **Miks GitHub Pages ei saa jooksutada Express taustaprogrammi?**
  - GitHub Pages on puhtalt staatiliste failide (HTML, CSS, JS, pildid) majutuskeskkond. See ei jooksuta Node.js serveriprotsesse ega andmebaase. Node.js backend tuleb majutada platvormil nagu Render, Railway, fly.io vms.
- **Frontend keskkonnamuutujad:**
  - Kõik frontendi keskkonnamuutujad (Vite'is `VITE_...`) kompileeritakse avalikku JavaScripti koodi sisse. Igaüks saab neid brauseri arendajatööriistades vaadata. Seetõttu **ei tohi** frontendi kunagi panna paroole ega salajasi API võtmeid.

---

### Teema 12: Korduvkasutatavad paigutused ja `children` prop

#### 1. Uurimisküsimused ja vastused:
- **Komponentide kompositsioon (*component composition*):**
  - Erinevate komponentide kombineerimine üksteise sisse, sarnaselt tavalistele HTML elementidele.
- **`children` prop:**
  - Spetsiaalne prop Reactis, mis esindab kõike, mis paigutatakse komponendi algus- ja lõpusildi vahele.
  ```jsx
  export function PageSection({ title, children }) {
    return (
      <section className="page-section">
        {title && <h2>{title}</h2>}
        <div className="section-content">{children}</div>
      </section>
    );
  }
  ```
- **Paigutuse taaskasutamine:**
  - Lubab luua ühtse raamistiku (kaardid, paneelid, modalid), vältides korduvat HTML-i ja CSS-i kirjutamist:
  ```jsx
  <PageSection title="My tasks">
    <TaskList tasks={tasks} />
  </PageSection>
  ```

---

### Teema 13: Reacti silumine ja komponenditestid (React Debugging and Component Tests)

#### 1. Uurimisküsimused ja vastused:
- **Brauseri konsooli vead (*console errors*) ja Reacti hoiatused (*warnings*):**
  - **Vead (Errors, punased):** Peatavad rakenduse või komponendi töö (nt `TypeError: Cannot read properties of undefined`). React 16+ puhul viib püüdmata viga terve komponendipuu kokkukukkumiseni (*unmounting*), kui pole kasutusel *Error Boundary*. Veateade sisaldab *component stack trace*-i, mis näitab täpselt, milline komponent ja koodirida vea põhjustas.
  - **Hoiatused (Warnings, kollased):** Teavitavad arendajat koodilõhnadest või reeglite rikkumisest, mis rakendust kohe ei peata, kuid võivad tekitada mälulekkeid või vigu (nt unikaalse `key` propi puudumine nimekirjas või hookide vale väljakutsumine).
- **Propside ja oleku inspekteerimine React Developer Toolsiga:**
  - Brauserilaiendus (Chrome/Firefox), mis lisab arendajatööriistadesse sakid **Components** ja **Profiler**.
  - **Components paneel:** Võimaldab visuaalselt uurida komponentide hierarhiat, näha ja muuta reaalajas mis tahes komponendi `props` ja `hooks` (`useState`, `useEffect`) väärtusi ilma koodi muutmata, ning näha, kes komponendi renderdas (*rendered by*).
- **Mida komponenditest (*component test*) kontrollib?**
  - Komponenditest kontrollib isoleeritud komponendi käitumist virtuaalses DOM-is (`jsdom`):
    1. Kas komponent kuvab talle etteantud andmed ekraanile korrektselt?
    2. Kuidas komponent reageerib kasutaja tegevustele (klikid, sisestused)?
    3. Kas komponent kutsub vajadusel välja ettenähtud funktsioonid (*callbacks*, nt `onToggle(task.id)`)?
- **Käitumise testimine vs stiilide või sisemiste muutujanimede testimine:**
  - *Testing Library* filosoofia: *"The more your tests resemble the way your software is used, the more confidence they can give you."*
  - **Käitumise testimine (õige lähenemine):** Testitakse seda, mida lõppkasutaja näeb ja teeb – otsitakse teksti ekraanilt (`screen.getByText('Learn JSX')`) või vajutatakse nuppe (`userEvent.click(...)`). Kui arendaja muudab komponendi sisemist struktuuri või muutujaid, kuid käitumine jääb samaks, jääb test roheliseks.
  - **Siseehituse ja stiilide testimine (vale lähenemine):** Testida CSS-klasse, värve või sisefunktsioonide nimesid teeb testid hapraks (*brittle*) – koodi refaktoreerimine lõhub testi, kuigi kasutaja jaoks kõik töötab.

#### 2. Koodilahendus:
- Paigaldatud `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`.
- Seadistatud failid `vite.config.js` ja `src/setupTests.js`.
- Testfail: `src/components/TaskCard.test.jsx`:
  ```jsx
  it('renders the task title', () => {
    render(
      <MemoryRouter>
        <TaskCard task={mockTask} onToggle={vi.fn()} onDelete={vi.fn()} />
      </MemoryRouter>
    );
    expect(screen.getByText('Learn JSX')).toBeInTheDocument();
  });

  it("calls the toggle callback with the task's ID when toggle button is clicked", async () => {
    const handleToggle = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <TaskCard task={mockTask} onToggle={handleToggle} onDelete={vi.fn()} />
      </MemoryRouter>
    );

    const toggleButton = screen.getByRole('button', { name: /mark completed/i });
    await user.click(toggleButton);

    expect(handleToggle).toHaveBeenCalledTimes(1);
    expect(handleToggle).toHaveBeenCalledWith(1);
  });
  ```

---

## Kokkuvõte ja kontrollkäsud

Kõik koodinäited, komponendid ja testid asuvad kaustas:
[task-tracker](file:///C:/Users/maiko/Documents/GitHub/Rakenduste-programmeerimine/2026-09-17/task-tracker)

Testitud ja toimivad käsud:
- `npm.cmd run dev` – arendusserver
- `npm.cmd run test:run` – Vitest komponenditestid
- `npm.cmd run format:check` – Prettier koodistiili kontroll
- `npm.cmd run lint` – koodi kvaliteedikontroll
- `npm.cmd run build` – tootmisversiooni kompileerimine kausta `dist/`
