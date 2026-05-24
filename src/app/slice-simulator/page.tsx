import {
  SliceSimulator,
  SliceSimulatorParams,
  getSlices,
} from '@slicemachine/adapter-next/simulator'
import { SliceZone } from '@prismicio/react'

import { components } from '@/slices'

/**
 * Slice Simulator
 *
 * Used by Slice Machine (localhost:9999) to preview slice components
 * in isolation with mock data. Not part of the public site — but a
 * route needs to exist for the simulator to point at.
 */
export default async function SliceSimulatorPage({ searchParams }: SliceSimulatorParams) {
  const slices = getSlices((await searchParams).state)

  return (
    <SliceSimulator>
      <SliceZone slices={slices} components={components} />
    </SliceSimulator>
  )
}
