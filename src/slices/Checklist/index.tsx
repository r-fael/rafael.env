import type { Content } from '@prismicio/client'
import type { SliceComponentProps } from '@prismicio/react'
import { Check } from 'lucide-react'

/**
 * Checklist slice
 *
 * A task list whose items the editor marks done / not-done individually.
 * Rendered as a semantic <ul> with a faux checkbox. The checked state is
 * exposed via `data-checked` so the visual styling lives in globals.css
 * next to the other slice styles (matching the CodeBlock pattern).
 *
 * The status word ("Done" / "To do") is rendered as visually-hidden text
 * so screen readers convey the state the checkbox glyph communicates
 * visually.
 */
export type ChecklistProps = SliceComponentProps<Content.ChecklistSlice>

export default function Checklist({ slice }: ChecklistProps) {
  const items = slice.primary.items ?? []

  return (
    <section data-slice-type={slice.slice_type} className="my-6">
      {slice.primary.title ? (
        <p className="checklist__title">{slice.primary.title}</p>
      ) : null}

      <ul role="list">
        {items.map((item, index) => (
          <li key={index} data-checked={item.checked ? 'true' : 'false'}>
            <span className="checklist__box" aria-hidden="true">
              {item.checked ? (
                <Check className="checklist__icon" strokeWidth={3} />
              ) : null}
            </span>
            <span className="checklist__label">
              <span className="sr-only">
                {item.checked ? 'Done: ' : 'To do: '}
              </span>
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
