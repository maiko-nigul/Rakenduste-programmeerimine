# Task Tracker (Lesson #2: React)

Täielik Reacti veebirakendus vastavalt Lesson #2 nõuetele.

## Käivitamine ja testimine

Liigu projekti kausta:

```bash
cd 2026-09-17/task-tracker
```

Paigalda sõltuvused (kui pole veel tehtud):

```bash
npm install
```

Käivita arendusserver:

```bash
npm run dev
```

Käivita komponenditestid (Vitest):

```bash
npm run test:run
# või reaalajas jälgimisega:
npm test
```

Kontrolli koodivormindust Prettieriga:

```bash
npm run format:check
# või automaatseks parandamiseks:
npm run format
```

Koosta tootmisversioon (production build):

```bash
npm run build
```

Eelvaata tootmisversiooni:

```bash
npm run preview
```

---

## Kaetud teemad ja funktsionaalsused

1. **React, Vite ja esimese rakenduse loomine**: Vite malliga loodud struktuur, `main.jsx`, `App.jsx`, pealkiri "Task Tracker".
2. **Git töövoog & Prettier**: `.prettierrc`, `.prettierignore`, `npm run format:check` ja `npm run format`.
3. **JSX, komponendid ja stiilid**: `Header`, `TaskCard`, spetsiifilised CSS klassid failis `src/App.css`.
4. **Props ja taaskasutatavad komponendid**: `TaskCard` võtab vastu `task` objekti ja käsitleb seda muutumatuna (read-only).
5. **Sündmused, useState ja tingimuslik renderdamine**: staatuse märgistamise nupud (`Completed` / `Not completed`), dünaamilised stiilid ja märgid.
6. **Nimekirjad, võtmed ja filtreerimine**: `TaskList` võimaldab filtreerida (`All`, `Completed`, `Incomplete`), stabiilsed `task.id` võtmed `.map()`-is ning tühja oleku teade "No tasks found".
7. **Kontrollitud vormid ja valideerimine**: `TaskForm` kontrollitud olekuga (`value`, `onChange`), tühja väärtuse valideerimine, Enteriga saatmine, vormi tühjendamine pärast lisamist.
8. **Ühine olek ja ülesannete haldamine**: Olek asub `App.jsx` tasemel; lisamine toimub `spread`-süntaksiga ja unikaalse täisarvulise ID genereerimisega, oleku muutmine `.map()` abil ja kustutamine `.filter()` abil.
9. **React Router ja detailvaade**: `HashRouter`, teed `/`, `/tasks`, `/tasks/:taskId` ja `*` (NotFound). `TaskDetailPage` loeb parameetrit `useParams` abil ja tegeleb vigaste ID-dega.
10. **useEffect, andmete laadimine ja API teenus**: `src/services/taskApi.js` (`getTasks`), mis laadib algandmed `public/tasks.json` failist. `useEffect` kasutab `AbortController` puhastust vananenud päringute vastu. Toetatud laadimis-, vea- ja eduseisundid.
11. **Production build ja GitHub Pages valmidus**: `vite.config.js` seadistatud `base: './'`, `HashRouter` tagab korrektse marsruutimise staatilises majutuses.
12. **Taaskasutatavad paigutused ja children prop**: `PageSection` võtab vastu `title` ja `children` propid, mida kasutatakse lehtede struktureerimiseks.
13. **Reacti silumine ja komponenditestid**: Vitest ja React Testing Library testid failis `TaskCard.test.jsx`, mis kontrollivad pealkirja renderdamist ja toggle-nupu tagasikutset.
