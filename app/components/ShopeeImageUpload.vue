<template>
  <div class="shopee-image-upload">
    <!-- Featured Image Section -->
    <div class="mb-4">
      <label class="form-label fw-bold">
        Featured Image <span class="text-danger">*</span>
        <small class="text-muted">(Image will be displayed first)</small>
      </label>
      <div class="featured-image-upload">
        <input
          ref="featuredInputRef"
          type="file"
          accept="image/*"
          class="d-none"
          @change="handleFeaturedImageSelect"
          :disabled="disabled"
        />
        <div
          class="featured-image-box"
          :class="{ 'has-image': featuredImage }"
          @click="!disabled && triggerFeaturedFileInput()"
          role="button"
          tabindex="0"
          @keydown.enter="!disabled && triggerFeaturedFileInput()"
          @keydown.space.prevent="!disabled && triggerFeaturedFileInput()"
        >
          <template v-if="featuredImage">
            <img
              :src="featuredImage.preview || featuredImage.path"
              :alt="featuredImage.name || featuredImage.alt"
              class="featured-preview"
            />
            <div class="image-overlay d-flex align-items-center justify-content-center">
              <i class="bi bi-pencil"></i>
            </div>
            <button
              v-if="!disabled"
              type="button"
              class="btn-remove-featured"
              @click.stop="removeFeaturedImage"
            >
              <i class="bi bi-x"></i>
            </button>
          </template>
          <template v-else>
            <i class="bi bi-image featured-icon"></i>
            <span class="mt-2">Click to upload featured image</span>
          </template>
        </div>
      </div>
    </div>

    <!-- Product Images Section -->
    <div>
      <label class="form-label fw-bold">Product Images</label>
      <div class="product-images-upload">
        <div class="images-grid">
          <!-- Upload Button -->
          <div
            class="image-upload-box"
            @click="!disabled && triggerMultiFileInput()"
            role="button"
            tabindex="0"
            @keydown.enter="!disabled && triggerMultiFileInput()"
            @keydown.space.prevent="!disabled && triggerMultiFileInput()"
          >
            <i class="bi bi-plus-lg upload-icon"></i>
            <span class="mt-2">Add Images</span>
          </div>

          <!-- Product Images -->
          <div
            v-for="(image, index) in displayImages"
            :key="index"
            class="product-image-box position-relative"
          >
            <img
              :src="image.preview || image.path"
              :alt="`Product image ${index + 1}`"
              class="product-image-preview"
            />
            
            <!-- Featured Badge -->
            <span
              v-if="image.is_featured"
              class="badge-featured position-absolute top-0 start-0 m-2"
            >
              <i class="bi bi-star-fill"></i> Featured
            </span>

            <!-- Image Actions -->
            <div class="image-actions">
              <button
                v-if="!image.is_featured && pendingImages.length > 0 && !disabled"
                type="button"
                class="btn-action btn-featured"
                @click="handleSetFeaturedPending(index)"
                title="Set as Featured"
              >
                <i class="bi bi-star"></i>
              </button>
              <button
                v-if="!disabled"
                type="button"
                class="btn-action btn-remove"
                @click="removePendingImage(index)"
                title="Remove"
              >
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- File Input for Multiple Images -->
        <input
          ref="multiFileInputRef"
          type="file"
          accept="image/*"
          multiple
          class="d-none"
          @change="handleMultipleImageSelect"
          :disabled="disabled"
        />
      </div>
      <small class="text-muted d-block mt-2" v-if="!disabled">
        <i class="bi bi-info-circle me-1"></i>
        Supported formats: JPG, PNG, GIF. Max size: 5MB per image.
      </small>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits([
  'update:featured',
  'update:images',
  'change',
  'set-featured',
  'remove-image',
  'remove-featured'
])

const props = defineProps({
  featured: {
    type: [Object, null],
    default: null
  },
  images: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const featuredInputRef = ref(null)
const multiFileInputRef = ref(null)

const featuredImage = ref(props.featured)
const pendingImages = ref(props.images || [])

const getImageKey = (image) => {
  if (!image) return null
  if (image.id) return `id:${image.id}`
  if (image.file) {
    return `file:${image.file.name}-${image.file.size}-${image.file.lastModified}`
  }
  if (image.path) return `path:${image.path}`
  if (image.preview) return `preview:${image.preview}`
  return null
}

const displayImages = computed(() => {
  const featuredKey = getImageKey(featuredImage.value)
  if (!featuredKey) return pendingImages.value

  return pendingImages.value.filter((image) => getImageKey(image) !== featuredKey)
})

// Watch for prop changes
watch(() => props.featured, (newVal) => {
  featuredImage.value = newVal
})

watch(() => props.images, (newVal) => {
  pendingImages.value = newVal || []
})

watch([featuredImage, pendingImages], () => {
  emit('update:featured', featuredImage.value)
  emit('update:images', pendingImages.value)
  emit('change', { featured: featuredImage.value, images: pendingImages.value })
}, { deep: true })

// Trigger file input
const triggerFeaturedFileInput = () => {
  if (props.disabled) return
  featuredInputRef.value?.click()
}

const triggerMultiFileInput = () => {
  if (props.disabled) return
  multiFileInputRef.value?.click()
}

// Handle featured image selection
const handleFeaturedImageSelect = (event) => {
  const file = event.target.files?.[0]
  if (file && !props.disabled) {
    validateAndSetFeatured(file)
  }
  event.target.value = ''
}

const validateAndSetFeatured = (file) => {
  if (!validateImage(file)) return
  
  const reader = new FileReader()
  reader.onload = (e) => {
    featuredImage.value = {
      file,
      preview: e.target.result,
      name: file.name,
      is_featured: true
    }
  }
  reader.readAsDataURL(file)
}

// Handle multiple image selection
const handleMultipleImageSelect = (event) => {
  const files = event.target.files
  if (files && files.length > 0 && !props.disabled) {
    processMultipleFiles(files)
  }
  event.target.value = ''
}

const processMultipleFiles = (files) => {
  const validFiles = []
  
  for (let i = 0; i < files.length; i++) {
    if (validateImage(files[i])) {
      validFiles.push(files[i])
    }
  }

  validFiles.forEach((file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      pendingImages.value.push({
        file,
        preview: e.target.result,
        name: file.name,
        is_featured: false
      })
    }
    reader.readAsDataURL(file)
  })
}

// Validate image file
const validateImage = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  const maxSize = 5 * 1024 * 1024 // 5MB
  
  if (!validTypes.includes(file.type)) {
    alert('Invalid file type. Please use JPG, PNG, GIF, or WEBP.')
    return false
  }
  
  if (file.size > maxSize) {
    alert(`File ${file.name} is too large. Maximum size is 5MB.`)
    return false
  }
  
  return true
}

// Remove featured image
const removeFeaturedImage = () => {
  if (props.disabled) return
  if (featuredImage.value?.id && !featuredImage.value?.file) {
    emit('remove-featured', featuredImage.value)
    return
  }

  const featuredKey = getImageKey(featuredImage.value)
  if (featuredKey) {
    pendingImages.value = pendingImages.value.map((image) => ({
      ...image,
      is_featured: getImageKey(image) === featuredKey ? false : image.is_featured
    }))
  }

  featuredImage.value = null
}

// Remove pending image
const removePendingImage = (index) => {
  if (props.disabled) return
  const image = displayImages.value[index]
  if (!image) return

  if (image.id && !image.file) {
    emit('remove-image', image)
    return
  }

  const imageKey = getImageKey(image)
  pendingImages.value = pendingImages.value.filter(
    (currentImage) => getImageKey(currentImage) !== imageKey
  )
}

// Set featured image from pending images
const handleSetFeaturedPending = (index) => {
  if (props.disabled) return
  const image = displayImages.value[index]
  if (!image) return

  // Remove featured flag from current featured image
  if (featuredImage.value) {
    featuredImage.value.is_featured = false
  }

  const targetKey = getImageKey(image)
  pendingImages.value = pendingImages.value.map((currentImage) => ({
    ...currentImage,
    is_featured: getImageKey(currentImage) === targetKey
  }))

  // Update featured image
  featuredImage.value = { ...image, is_featured: true }

  if (image.id && !image.file) {
    emit('set-featured', image)
  }
}

// Clear all images
const clearAll = () => {
  featuredImage.value = null
  pendingImages.value = []
}

// Expose clearAll for parent components
defineExpose({
  clearAll
})
</script>

<style scoped>
.shopee-image-upload {
  width: 100%;
}

/* Featured Image Box */
.featured-image-upload {
  max-width: 300px;
}

.featured-image-box {
  width: 100%;
  aspect-ratio: 1 / 1;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  background-color: #fafafa;
}

.featured-image-box:hover {
  border-color: #1677ff;
  background-color: #e6f7ff;
}

.featured-image-box.has-image {
  border: none;
  border-radius: 8px;
  overflow: hidden;
}

.featured-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.2s;
  color: white;
  font-size: 2rem;
}

.featured-image-box:hover .image-overlay {
  opacity: 1;
}

.btn-remove-featured {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  color: #ff4d4f;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 10;
}

.featured-image-box.has-image:hover .btn-remove-featured {
  opacity: 1;
}

.featured-icon {
  font-size: 3rem;
  color: #d9d9d9;
}

/* Product Images Grid */
.product-images-upload {
  width: 100%;
}

.images-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.image-upload-box,
.product-image-box {
  width: 160px;
  height: 160px;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #fafafa;
  position: relative;
}

.image-upload-box:hover,
.product-image-box:hover {
  border-color: #1677ff;
  background-color: #e6f7ff;
}

.image-upload-box .upload-icon {
  font-size: 2.5rem;
  color: #d9d9d9;
}

.product-image-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* Image Actions */
.image-actions {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: opacity 0.2s;
  padding: 8px;
  box-sizing: border-box;
  pointer-events: none;
}

.image-actions .btn-action {
  pointer-events: auto;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
  color: white;
  padding: 0;
}

.btn-featured {
  background: rgba(0, 122, 255, 0.8);
}

.btn-featured:hover {
  background: rgba(0, 122, 255, 1);
  transform: scale(1.1);
}

.btn-remove {
  background: rgba(255, 77, 79, 0.8);
}

.btn-remove:hover {
  background: rgba(255, 77, 79, 1);
  transform: scale(1.1);
}

.product-image-box:hover .image-actions {
  opacity: 1;
}

/* Featured Badge */
.badge-featured {
  background: #52c41a;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 10;
}
</style>
