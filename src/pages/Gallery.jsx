import { useState, useEffect } from 'react'
import { API_URL } from '../config'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedYouTube, setSelectedYouTube] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)

  const [galleryImages, setGalleryImages] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch gallery content
  useEffect(() => {
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

    const fetchGallery = async () => {
      try {
        const response = await fetch(`${API_URL}/api/gallery`)
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }
        const data = await response.json()

        if (data.success && data.photos) {
          // Transform API data to match component structure
          const formattedImages = data.photos
            .filter(item => item.mediaType === 'image')
            .map(item => ({
              id: item._id,
              src: item.mediaUrl && item.mediaUrl.startsWith('http') ? item.mediaUrl : `${API_URL}${item.mediaUrl}`,
              alt: item.title,
              category: item.category,
              size: item.size || 'normal'
            }))

          // Always combine DB images with static images
          setGalleryImages([...formattedImages, ...staticImages])
        } else {
          setGalleryImages(staticImages)
        }
      } catch (error) {
        console.error('Error fetching gallery:', error)
        setGalleryImages(staticImages)
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

  // Compute category cards
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

  // Add Video category
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

  // Determine items to show
  const itemsToShow = activeCategory === 'Video'
    ? youtubeVideos
    : galleryImages.filter(img => img.category === activeCategory)

  // Helper to map size classes for Tailwind
  const getSizeClass = (size) => {
    switch (size) {
      case 'wide':
        return 'md:col-span-2 md:row-span-1 h-[250px]'
      case 'tall':
        return 'md:col-span-1 md:row-span-2 h-[524px]'
      case 'large':
        return 'md:col-span-2 md:row-span-2 h-[524px]'
      case 'normal':
      default:
        return 'md:col-span-1 md:row-span-1 h-[250px]'
    }
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-24">
      {/* Page Header */}
      <div className="text-center pt-16 pb-12 max-w-[1200px] mx-auto px-6">
        <h1 className="font-display-lg text-4xl md:text-5xl text-primary font-bold mb-4">Temple Gallery</h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Explore the beauty and spirituality of our temple through these images and video.
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto px-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-surface-container border-t-primary rounded-full animate-spin"></div>
            <p className="text-sm text-on-surface-variant">Loading gallery items...</p>
          </div>
        ) : !activeCategory ? (
          /* Category Grid View */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            {categoryCards.map((cat) => (
              <div
                key={cat.id}
                className={`relative overflow-hidden rounded-xl border border-outline-variant/20 shadow-md card-hover-effect cursor-pointer group ${getSizeClass(cat.size)}`}
                onClick={() => setActiveCategory(cat.title)}
              >
                <img
                  src={cat.coverSrc}
                  alt={cat.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02MCA3MEw4MCA5MEwxNDAgMzBMMTQwIDEyMEg2MFY3MFoiIGZpbGw9IiNEMUQ1REIiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCI+CjxwYXRoIGZpbGw9IiM5Q0EzQUYiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0tMiAxNWwtNS01aDMuNTlMMTIgMTZsNC40MS00SDIwbC01IDV6Ii8+Cjwvc3ZnPgo8dGV4dCB4PSIxMDAiIHk9Ijc1IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pgo8L3N2Zz4K'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-6">
                  <h2 className="text-white font-headline-md text-xl md:text-2xl font-bold">{cat.title}</h2>
                  <p className="text-white/80 font-body-md text-xs mt-1">
                    {cat.count} {cat.count === 1 ? 'Item' : 'Items'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Active Category View */
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-outline-variant/20">
              <button
                className="text-primary hover:text-tertiary flex items-center gap-1 font-semibold text-sm transition-colors w-fit"
                onClick={() => setActiveCategory(null)}
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Back to Categories
              </button>
              <h2 className="font-headline-lg text-2xl text-primary font-bold">{activeCategory}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
              {itemsToShow.map((item) => (
                <div
                  key={item.id}
                  className={`relative overflow-hidden rounded-xl border border-outline-variant/20 shadow-md card-hover-effect cursor-pointer group ${getSizeClass(item.size)}`}
                  onClick={() => {
                    if (item.mediaType === 'youtube') {
                      setSelectedYouTube(item)
                    } else {
                      setSelectedImage(item)
                    }
                  }}
                >
                  {item.mediaType === 'youtube' ? (
                    <div className="w-full h-full relative">
                      <img
                        src={item.thumbnail}
                        alt={item.alt}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`
                        }}
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                        <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-2xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                            play_arrow
                          </span>
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-secondary-container/90 backdrop-blur-md px-3 py-1 rounded-full text-on-secondary-container text-xs font-bold uppercase tracking-wider">
                        Video
                      </div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02MCA3MEw4MCA5MEwxNDAgMzBMMTQwIDEyMEg2MFY3MFoiIGZpbGw9IiNEMUQ1REIiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCI+CjxwYXRoIGZpbGw9IiM5Q0EzQUYiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0tMiAxNWwtNS01aDMuNTlMMTIgMTZsNC40MS00SDIwbC01IDV6Ii8+Cjwvc3ZnPgo8dGV4dCB4PSIxMDAiIHk9Ijc1IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pgo8L3N2Zz4K'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <p className="text-white text-sm font-semibold">{item.alt}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-[900px] w-full max-h-[85vh] flex flex-col bg-surface-container rounded-lg overflow-hidden shadow-2xl border border-outline-variant/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-black/60 text-white hover:text-primary w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold transition-colors z-10"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <div className="flex-1 overflow-hidden flex items-center justify-center bg-black min-h-[300px]">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>
            <div className="p-5 bg-surface-container-low border-t border-outline-variant/20 flex flex-col gap-1">
              <h3 className="font-headline-md text-base md:text-lg text-primary font-bold">{selectedImage.alt}</h3>
              <p className="text-xs text-on-surface-variant uppercase tracking-wider">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}

      {/* YouTube Video Lightbox Modal */}
      {selectedYouTube && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setSelectedYouTube(null)}
        >
          <div
            className="relative max-w-[900px] w-full bg-surface-container rounded-lg overflow-hidden shadow-2xl border border-outline-variant/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-black/60 text-white hover:text-primary w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold transition-colors z-10"
              onClick={() => setSelectedYouTube(null)}
            >
              ×
            </button>
            <div className="aspect-video w-full bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedYouTube.youtubeId}?autoplay=1`}
                title={selectedYouTube.alt}
                style={{ border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-5 bg-surface-container-low border-t border-outline-variant/20 space-y-1">
              <h3 className="font-headline-md text-base md:text-lg text-primary font-bold">{selectedYouTube.alt}</h3>
              <p className="text-xs text-on-surface-variant uppercase tracking-wider">{selectedYouTube.category}</p>
              {selectedYouTube.description && (
                <p className="text-xs text-on-surface-variant italic pt-1">{selectedYouTube.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery