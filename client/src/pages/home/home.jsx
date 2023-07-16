import React from 'react'
import Slider from '../../components/slider/slider'
import Featuredproducts from '../../components/featuredProducts/featuredproducts'
import "./Home.scss"
import Categories from '../../components/categories/categories'
import Contact from '../../components/contact/contact'
const home = () => {
  return (
    <div className='home'>
      <Slider className='slider'/>
      <Featuredproducts type="featured"/>
      <Categories/>
      <Featuredproducts type="trending"/>
      <Contact/>
    </div>
  )
}

export default home
