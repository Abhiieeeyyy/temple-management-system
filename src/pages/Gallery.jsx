import { useState, useEffect } from 'react'
import { API_URL } from '../config'
import '../styles/Gallery.css'
import '../styles/PageAnimations.css'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedYouTube, setSelectedYouTube] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)

  const [galleryImages, setGalleryImages] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch gallery content
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(`${API_URL}/api/gallery`)
        const data = await response.json()

        if (data.success) {
          // Transform API data to match component structure
          const formattedImages = data.photos
            .filter(item => item.mediaType === 'image')
            .map(item => ({
              id: item._id,
              src: item.mediaUrl && item.mediaUrl.startsWith('http') ? item.mediaUrl : `${API_URL}${item.mediaUrl}`, // The backend returns the full path starting with /uploads
              alt: item.title,
              category: item.category,
              size: item.size || 'normal'
            }))

          // Define static images
          const staticImages = [
            {
              id: 'static-1',
              src: '/images/temple1.jpg',
              alt: 'Honored',
              category: 'Events',
              size: 'wide'
            },
            {
              id: 'static-3',
              src: '/images/temple3.jpg',
              alt: 'Temple Architecture Detail',
              category: 'Surroundings',
              size: 'tall'
            },
            {
              id: 'static-4',
              src: '/images/temple4.jpg',
              alt: 'Festival Celebration',
              category: 'Events',
              size: 'normal'
            },
            {
              id: 'static-5',
              src: '/images/temple5.jpg',
              alt: 'Evening Aarti',
              category: 'Rituals',
              size: 'normal'
            },
            {
              id: 'static-7',
              src: '/images/temple7.jpg',
              alt: 'Beautiful Deity Statue',
              category: 'Deities',
              size: 'tall'
            },
            {
              id: 'static-8',
              src: '/images/temple8.jpg',
              alt: 'Sacred Deity Shrine',
              category: 'Deities',
              size: 'normal'
            },
            {
              id: 'static-9',
              src: '/images/t1.jpg',
              alt: 'Gift',
              category: 'Events',
              size: 'wide'
            },
            {
              id: 'static-10',
              src: '/images/t2.jpg',
              alt: 'Temple Architecture Detail',
              category: 'Surroundings',
              size: 'large'
            },
            {
              id: 'static-11',
              src: '/images/t3.jpg',
              alt: 'Ada pongala',
              category: 'Events',
              size: 'normal'
            },
            {
              id: 'static-12',
              src: '/images/t4.jpg',
              alt: 'Aarattu Festival Procession',
              category: 'Events',
              size: 'normal'
            },
            {
              id: 'static-13',
              src: '/images/t5.jpg',
              alt: 'Festival Celebration ',
              category: 'Events',
              size: 'tall'
            },
            {
              id: 'static-14',
              src: '/images/t6.jpg',
              alt: 'Devotees Gathering',
              category: 'Events',
              size: 'wide'
            },
            {
              id: 'static-15',
              src: '/images/t7.jpg',
              alt: 'Temple Elephant',
              category: 'Events',
              size: 'normal'
            },
            {
              id: 'static-16',
              src: '/images/t8.jpg',
              alt: 'Arattu ',
              category: 'Rituals',
              size: 'normal'
            },
            {
              id: 'static-17',
              src: '/images/t9.jpg',
              alt: 'Festival Celebration Crowd',
              category: 'Events',
              size: 'large'
            },
          ]

          // Always combine DB images with static images
          setGalleryImages([...formattedImages, ...staticImages])
        }
      } catch (error) {
        console.error('Error fetching gallery:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
  }, [])


  // YouTube video content
  const youtubeVideos = [
    {
      id: 'youtube-1',
      youtubeId: 'IA-tiSYjrkY',
      thumbnail: 'https://img.youtube.com/vi/IA-tiSYjrkY/maxresdefault.jpg',
      alt: 'Temple Festival Highlights',
      category: 'Video',
      mediaType: 'youtube',
      description: 'Watch our temple festival celebrations',
      size: 'large'
    }
  ]

  // Compute category cards for Bento Grid
  const categoryNames = [...new Set(galleryImages.map(img => img.category))]
  const bentoSizes = ['large', 'tall', 'wide', 'normal', 'normal', 'wide', 'tall', 'large']

  const categoryCards = categoryNames.map((cat, index) => {
    const items = galleryImages.filter(img => img.category === cat)
    return {
      id: `cat-${cat}`,
      title: cat,
      coverSrc: items[0]?.src,
      count: items.length,
      size: bentoSizes[index % bentoSizes.length]
    }
  })


  // Add Video as a distinct category
  if (youtubeVideos.length > 0) {
    categoryCards.push({
      id: 'cat-Video',
      title: 'Video',
      coverSrc: youtubeVideos[0].thumbnail,
      count: youtubeVideos.length,
      size: 'wide',
      isVideo: true
    })
  }

  // Determine items to show when inside a category
  const itemsToShow = activeCategory === 'Video'
    ? youtubeVideos
    : galleryImages.filter(img => img.category === activeCategory)

  return (
    <div className="gallery-page">
      <h1 className="page-heading-animated">Temple Gallery</h1>
      <p className="gallery-intro page-subtitle-animated">
        Explore the beauty and spirituality of our temple through these images and video.
      </p>

      {!activeCategory ? (
        <div className="gallery-grid category-grid">
          {categoryCards.map((cat) => (
            <div
              key={cat.id}
              className={`gallery-item category-card ${cat.size}`}
              onClick={() => setActiveCategory(cat.title)}
            >
              <img
                src={cat.coverSrc}
                alt={cat.title}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02MCA3MEw4MCA5MEwxNDAgMzBMMTQwIDEyMEg2MFY3MFoiIGZpbGw9IiNEMUQ1REIiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCI+CjxwYXRoIGZpbGw9IiM5Q0EzQUYiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0tMiAxNWwtNS01aDMuNTlMMTIgMTZsNC40MS00SDIwbC01IDV6Ii8+Cjwvc3ZnPgo8dGV4dCB4PSIxMDAiIHk9Ijc1IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pgo8L3N2Zz4K'
                }}
              />
              <div className="category-card-overlay">
                <h2>{cat.title}</h2>
                <p>{cat.count} {cat.count === 1 ? 'Item' : 'Items'}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="category-view-container fade-in">
          <div className="category-header">
            <button className="back-button" onClick={() => setActiveCategory(null)}>
              ← Back to Categories
            </button>
            <h2 className="active-category-title">{activeCategory}</h2>
          </div>

          <div className="gallery-grid">
            {itemsToShow.map((item) => (
              <div
                key={item.id}
                className={`gallery-item ${item.size || 'normal'}`}
                onClick={() => {
                  if (item.mediaType === 'youtube') {
                    setSelectedYouTube(item)
                  } else {
                    setSelectedImage(item)
                  }
                }}
              >
                {item.mediaType === 'youtube' ? (
                  <div className="youtube-thumbnail">
                    <img
                      src={item.thumbnail}
                      alt={item.alt}
                      onError={(e) => {
                        e.target.src = `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`
                      }}
                    />
                    <div className="play-button">►</div>
                    <div className="video-overlay">
                      <span className="video-label">YOUTUBE</span>
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt}
                    onError={(e) => {
                      console.error('Image load error:', e)
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02MCA3MEw4MCA5MEwxNDAgMzBMMTQwIDEyMEg2MFY3MFoiIGZpbGw9IiNEMUQ1REIiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCI+CjxwYXRoIGZpbGw9IiM5Q0EzQUYiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0tMiAxNWwtNS01aDMuNTlMMTIgMTZsNC40MS00SDIwbC01IDV6Ii8+Cjwvc3ZnPgo8dGV4dCB4PSIxMDAiIHk9Ijc1IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pgo8L3N2Zz4K'
                      e.target.alt = 'Image not found'
                    }}
                  />
                )}
                <div className="image-overlay">
                  <p>{item.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img src={selectedImage.src} alt={selectedImage.alt} />
            <div className="lightbox-caption">
              <h3>{selectedImage.alt}</h3>
              <p>{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}

      {selectedYouTube && (
        <div className="lightbox" onClick={() => setSelectedYouTube(null)}>
          <div className="lightbox-content video-content" onClick={e => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={() => setSelectedYouTube(null)}
            >
              ×
            </button>
            <div className="youtube-embed">
              <iframe
                width="100%"
                height="500"
                src={`https://www.youtube.com/embed/${selectedYouTube.youtubeId}?autoplay=1`}
                title={selectedYouTube.alt}
                style={{ border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="lightbox-caption">
              <h3>{selectedYouTube.alt}</h3>
              <p>{selectedYouTube.category}</p>
              {selectedYouTube.description && <p><em>{selectedYouTube.description}</em></p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery