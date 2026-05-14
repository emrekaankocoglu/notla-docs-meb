---
title: Page-building example (Markdoc)
nextjs:
  metadata:
    title: Page-building example (Markdoc)
    description: The same screenshot-driven walkthrough authored in Markdoc, kept as a reference alongside the React version.
---

A working template that pairs an app screenshot with a short walkthrough — same content as the React version, authored in Markdoc instead. Each section below is sized to land on its own screen in PDF mode (`?pdf=1`) so it can be captured cleanly. {% .lead %}

---

## Courses overview

The Courses dashboard is the first thing a coordinator sees after signing in. It lists every course in their organisation alongside a tile for creating a new one.

{% figure src="/screenshots/notla-courses.png" alt="Notla coordinator courses dashboard listing two existing courses and an Add a new course tile." caption="Coordinator view — Notla / Courses" /%}

- **Sidebar navigation** keeps `Courses` and `Users` reachable from anywhere in the app.
- **Welcome banner** confirms which organisation the coordinator is managing.
- **Course tiles** show each course with an icon, exam name, and a `View course` action.

---

## Course tile actions

Every course tile is interactive on its own. The example below highlights how a coordinator moves from the overview into a course or starts a new one.

{% figure src="/screenshots/notla-courses.png" alt="The same Courses dashboard, annotated to show how the Add a new course and View course controls behave." caption="Tile interactions — clicking through" /%}

- **Add a new course** opens the create-or-enroll wizard from the dashed tile.
- **View course** drops the coordinator into the course's home screen with assignments and rosters.
- **Course title** doubles as a navigation link, mirroring the `View course` action.

---

## Authoring tips

A few rules of thumb when copying this template:

- Give each screen a `## ` heading, one short intro sentence, one figure, and three bullet points. The auto-paginator keeps that grouping together.
- Put a `---` between screens to make the source easy to scan, even though the paginator does the actual splitting at runtime.
- Switch to PDF mode (`?pdf=1`) and resize the window to your target output dimensions before capturing. The header counter (`screen N / M`) confirms everything paginated as expected.
