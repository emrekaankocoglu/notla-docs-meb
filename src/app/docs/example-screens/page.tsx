import type { Metadata } from 'next'

import { DocPage, type DocSection } from '@/components/DocPage'
import { ScreenSection } from '@/components/ScreenSection'

export const metadata: Metadata = {
  title: 'Page-building example',
  description:
    'A reference template for screenshot-driven docs that paginate cleanly in PDF mode.',
}

const screenshot = {
  src: '/screenshots/notla-courses.png',
  width: 1623,
  height: 1162,
}

type Bullet = { id: string; body: React.ReactNode }
type Screen = {
  id: string
  title: string
  intro: string
  caption: string
  alt: string
  bullets: Array<Bullet>
}

const screens: Array<Screen> = [
  {
    id: 'courses-overview',
    title: 'Courses overview',
    intro:
      'The Courses dashboard is the first thing a coordinator sees after signing in. It lists every course in their organisation alongside a tile for creating a new one.',
    caption: 'Coordinator view — Notla / Courses',
    alt: 'Notla coordinator courses dashboard listing two existing courses and an Add a new course tile.',
    bullets: [
      {
        id: 'sidebar',
        body: (
          <>
            <strong>Sidebar navigation</strong> keeps <code>Courses</code> and{' '}
            <code>Users</code> reachable from anywhere in the app.
          </>
        ),
      },
      {
        id: 'welcome',
        body: (
          <>
            <strong>Welcome banner</strong> confirms which organisation the
            coordinator is managing.
          </>
        ),
      },
      {
        id: 'tiles',
        body: (
          <>
            <strong>Course tiles</strong> show each course with an icon, exam
            name, and a <code>View course</code> action.
          </>
        ),
      },
    ],
  },
  {
    id: 'course-tile-actions',
    title: 'Course tile actions',
    intro:
      'Every course tile is interactive on its own. The example below highlights how a coordinator moves from the overview into a course or starts a new one.',
    caption: 'Tile interactions — clicking through',
    alt: 'The same Courses dashboard, annotated to show how the Add a new course and View course controls behave.',
    bullets: [
      {
        id: 'add',
        body: (
          <>
            <strong>Add a new course</strong> opens the create-or-enroll wizard
            from the dashed tile.
          </>
        ),
      },
      {
        id: 'view',
        body: (
          <>
            <strong>View course</strong> drops the coordinator into the
            course&apos;s home screen with assignments and rosters.
          </>
        ),
      },
      {
        id: 'title',
        body: (
          <>
            <strong>Course title</strong> doubles as a navigation link,
            mirroring the <code>View course</code> action.
          </>
        ),
      },
    ],
  },
]

const tableOfContents: Array<DocSection> = [
  ...screens.map(({ id, title }) => ({ id, title })),
  { id: 'authoring-tips', title: 'Authoring tips' },
]

export default function ExampleScreensPage() {
  return (
    <DocPage
      title="Page-building example"
      tableOfContents={tableOfContents}
    >
      <p className="lead">
        A working template that pairs an app screenshot with a short
        walkthrough. Each section below is sized to land on its own screen in
        PDF mode (<code>?pdf=1</code>) so it can be captured cleanly. Use it as
        a starting point when documenting a feature screen-by-screen.
      </p>

      <hr />

      {screens.flatMap((screen, i) => {
        const items = [
          <ScreenSection
            key={screen.id}
            id={screen.id}
            title={screen.title}
            intro={screen.intro}
            image={screenshot.src}
            imageWidth={screenshot.width}
            imageHeight={screenshot.height}
            alt={screen.alt}
            caption={screen.caption}
          >
            <ul>
              {screen.bullets.map((bullet) => (
                <li key={bullet.id}>{bullet.body}</li>
              ))}
            </ul>
          </ScreenSection>,
        ]
        if (i < screens.length - 1) {
          items.push(<hr key={`${screen.id}-divider`} />)
        }
        return items
      })}

      <hr />

      <section className="scroll-mt-28">
        <h2 id="authoring-tips">Authoring tips</h2>
        <p>A few rules of thumb when copying this template:</p>
        <ul>
          <li>
            Drive each screen with one <code>&lt;ScreenSection&gt;</code>: a
            heading, one screenshot, a one-sentence intro, and three bullet
            points. The auto-paginator keeps that grouping together because the
            section renders as a single block.
          </li>
          <li>
            Put a <code>&lt;hr /&gt;</code> between major sections to mark
            intended screen boundaries. The PDF paginator treats it as a soft
            page break.
          </li>
          <li>
            Switch to PDF mode (<code>?pdf=1</code>) and resize the window to
            your target output dimensions before capturing. The header counter
            (<code>screen N / M</code>) confirms everything paginated as
            expected.
          </li>
        </ul>
      </section>
    </DocPage>
  )
}
