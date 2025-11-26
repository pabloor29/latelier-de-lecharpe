import React from 'react'
import IntroRestaurant from './IntroRestaurant'
import CarouselRestaurant from './CarouselRestaurant'
import GroupSection from './GroupSection'

function MainPage() {
  return (
    <div>
      <IntroRestaurant />
      {/* <CarouselRestaurant /> */}
      <GroupSection />
    </div>
  )
}

export default MainPage