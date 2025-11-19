import React from 'react'
import IntroRestaurant from './IntroRestaurant'
import SuggestionChef from './SuggestionChef'
import IntroVins from './IntroVins'
import CarouselRestaurant from './CarouselRestaurant'
import GroupSection from './GroupSection'

function MainPage() {
  return (
    <div>
      <IntroRestaurant />
      {/* <SuggestionChef /> */}
      {/* <IntroVins /> */}
      {/* <CarouselRestaurant /> */}
      <GroupSection />
    </div>
  )
}

export default MainPage