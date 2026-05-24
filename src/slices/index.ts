/**
 * Slice library entry point.
 *
 * `@slicemachine/adapter-next` reads this file to know which slice
 * components correspond to which slice models. Slice Machine will
 * (re)generate this file when slices are added/removed via the GUI;
 * the manual export below ensures it works even before generation.
 */
import dynamic from 'next/dynamic'

export const components = {
  rich_text: dynamic(() => import('./RichText')),
  code_block: dynamic(() => import('./CodeBlock')),
  image_block: dynamic(() => import('./ImageBlock')),
  quote: dynamic(() => import('./Quote')),
}
