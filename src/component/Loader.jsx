import React from 'react'
// import './loader.css'
import Lottie from 'lottie-react'
import animationData from './weather.json'
// import animationData from './Animation - jumping.json'

const Loader = () => {
  return (
    <>
      <div style={styles.loaderContainer}>
        <Lottie
          animationData={animationData}
          loop={true}
          style={{ width: 200, height: 200 }}
        />
        <div style={styles.textContainer}>
          <h1 style={styles.headingText}>Loading Sunbeam Giggles...</h1>
        </div>
      </div>
    </>
  )
}

const styles = {
  loaderContainer: {
    display: 'flex',
    flexDirection: 'column', // Text ko animation ke neeche lane ke liye
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Puri screen ka height le raha hai for centering
    backgroundColor: '#fff' /* White background for the preloader */,
    pointerEvents: 'none' /* Disable all mouse interactions */
  },
  textContainer: {
    marginTop: '20px', // Space between the animation and text
    textAlign: 'center', // Center-align the text
    padding: '10px 20px', // Padding for better spacing
    backgroundColor: '#f0f0f0', // Light grey background for text container
    borderRadius: '10px', // Rounded corners for text container
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    maxWidth: '80%' // Max width to prevent text from stretching too wide
  },
  headingText: {
    fontSize: '1.5rem', // Bigger font for heading
    fontWeight: '600', // Semi-bold text for heading
    color: '#333', // Darker color for heading text
    marginBottom: '10px' // Space below heading
  },
  paragraphText: {
    fontSize: '1rem', // Standard font size for paragraph
    color: '#555' // Slightly lighter color for paragraph text
  }
}

export default Loader
