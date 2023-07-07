import React from 'react'
import "./Home.css"

const Home = () => {
  return (
    <div class="hero">
      <div class="subHero">
        <h1 class="title">LifeTracker</h1>
        <h1 class="titleTwo">Health App❤️</h1>
        <h2 class="subTitle">Helping you cultivate a healthy lifestyle.</h2>
      </div>
    <div class="image-container">
      <img src="https://lifetracker-ui-ai8e.onrender.com/assets/tracker-2a96bfd0.jpg" width="500" class="chakra-image css-incex5"/>
    </div>


    <div className="image-grid">
      <p className='Fitness'></p>
      <img src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" width="200" alt="Image 1"  />

      <p className='Food'></p>
      <img src="https://images.unsplash.com/photo-1450650795614-745f80d91080?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fGZydWl0JTIwcm91Z2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" width="200" alt="Image 2" />

      <p className='Rest'></p>
      <img src="https://images.unsplash.com/photo-1498681353033-e5632ec6decd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1805&q=80" width="200" alt="Image 3" />

      <p className='Planner'></p>
      <img src="https://images.unsplash.com/photo-1632772998001-cc9bf6f7c852?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" width="200" alt="Image 4" />
    </div>
  </div>

  )
}

export default Home