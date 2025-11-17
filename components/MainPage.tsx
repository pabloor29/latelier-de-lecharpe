import React from 'react'
import IntroRestaurant from './IntroRestaurant'
import SuggestionChef from './SuggestionChef'
import IntroVins from './IntroVins'
import CarouselRestaurant from './CarouselRestaurant'
import PlatCursorEffect from './PlatCursorEffect'

function MainPage() {
  return (
    <div>
      <IntroRestaurant />
      <SuggestionChef />
      <IntroVins />
      <CarouselRestaurant />
      <PlatCursorEffect />
    </div>
  )
}

export default MainPage