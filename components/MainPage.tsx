import React from 'react'
import IntroRestaurant from './IntroRestaurant'
import CarouselRestaurant from './CarouselRestaurant'
import GroupSection from './GroupSection'
import HappyHour from './HappyHour'

function MainPage() {
  return (
    <div>
      <IntroRestaurant />
      {/* <CarouselRestaurant /> */}
      <GroupSection />
      {/* <HappyHour /> */}
    </div>
  )
}

export default MainPage