/**
 * Mock data untuk testing dan development
 * Gunakan data ini jika API belum tersedia
 */

export const mockUsers = [
  {
    id: 1,
    name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '+62812345678',
    gender: 'MALE',
    dob: '1990-05-15',
    email_verified_at: '2024-01-10T10:00:00',
    created_at: '2024-01-05T08:30:00',
    roles: [{ id: 1, name: 'Admin' }]
  },
  {
    id: 2,
    name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+62812345679',
    gender: 'FEMALE',
    dob: '1995-03-20',
    email_verified_at: '2024-01-08T14:00:00',
    created_at: '2024-01-02T09:15:00',
    roles: [{ id: 2, name: 'Manager' }]
  },
  {
    id: 3,
    name: 'Robert',
    last_name: 'Johnson',
    email: 'robert.johnson@example.com',
    phone: '+62812345680',
    gender: 'MALE',
    dob: '1988-07-10',
    email_verified_at: null,
    created_at: '2024-01-15T11:45:00',
    roles: [{ id: 3, name: 'User' }]
  },
  {
    id: 4,
    name: 'Alice',
    last_name: 'Williams',
    email: 'alice.williams@example.com',
    phone: '+62812345681',
    gender: 'FEMALE',
    dob: '1992-11-25',
    email_verified_at: '2024-01-12T16:20:00',
    created_at: '2024-01-03T13:30:00',
    roles: [{ id: 1, name: 'Admin' }, { id: 2, name: 'Manager' }]
  },
  {
    id: 5,
    name: 'Michael',
    last_name: 'Brown',
    email: 'michael.brown@example.com',
    phone: '+62812345682',
    gender: 'MALE',
    dob: '1991-09-30',
    email_verified_at: '2024-01-11T12:00:00',
    created_at: '2024-01-06T10:00:00',
    roles: [{ id: 3, name: 'User' }]
  }
]

export const mockBlogs = [
  {
    id: 1,
    title: 'Getting Started with Vue 3',
    slug: 'getting-started-vue-3',
    short_desc: 'Learn the basics of Vue 3 framework',
    long_desc: 'Comprehensive guide to Vue 3 with Composition API...',
    fk_category: 1,
    status: 1,
    hot_news: 1,
    created_at: '2024-01-15T08:00:00'
  },
  {
    id: 2,
    title: 'Business Tips for Success',
    slug: 'business-tips-success',
    short_desc: 'Top 10 tips to grow your business',
    long_desc: 'Essential tips for entrepreneurs and business owners...',
    fk_category: 2,
    status: 1,
    hot_news: 0,
    created_at: '2024-01-14T10:30:00'
  },
  {
    id: 3,
    title: 'Healthy Lifestyle Guide',
    slug: 'healthy-lifestyle-guide',
    short_desc: 'Daily habits for better health',
    long_desc: 'Complete guide to maintaining a healthy lifestyle...',
    fk_category: 3,
    status: 1,
    hot_news: 0,
    created_at: '2024-01-13T14:15:00'
  }
]

export const mockProducts = [
  {
    id: 1,
    name: 'Laptop Gaming Pro',
    slug: 'laptop-gaming-pro',
    status: 'PUBLISH',
    is_freeshiping: 'ACTIVE',
    weight: 2.5,
    size_long: 35,
    size_tall: 25,
    size_wide: 2,
    sort: 1,
    created_at: '2024-01-10T09:00:00'
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    slug: 'wireless-mouse',
    status: 'PUBLISH',
    is_freeshiping: 'ACTIVE',
    weight: 0.1,
    size_long: 10,
    size_tall: 5,
    size_wide: 3,
    sort: 2,
    created_at: '2024-01-12T11:30:00'
  },
  {
    id: 3,
    name: 'USB-C Hub',
    slug: 'usb-c-hub',
    status: 'PUBLISH',
    is_freeshiping: 'ACTIVE',
    weight: 0.3,
    size_long: 15,
    size_tall: 8,
    size_wide: 5,
    sort: 3,
    created_at: '2024-01-11T14:45:00'
  }
]

export const mockRoles = [
  { id: 1, name: 'Super Admin', description: 'Full access to all features' },
  { id: 2, name: 'Admin', description: 'Admin privileges' },
  { id: 3, name: 'Manager', description: 'Can manage content' },
  { id: 4, name: 'User', description: 'Regular user access' }
]

/**
 * Generate random user data untuk testing
 */
export const generateMockUser = (id: number = 1) => {
  const firstNames = ['John', 'Jane', 'Robert', 'Alice', 'Michael', 'Sarah', 'David', 'Emma']
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis']
  const genders = ['MALE', 'FEMALE']

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  const gender = genders[Math.floor(Math.random() * genders.length)]

  return {
    id,
    name: firstName,
    last_name: lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    phone: `+628${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    gender,
    dob: '1990-01-01',
    email_verified_at: Math.random() > 0.3 ? new Date().toISOString() : null,
    created_at: new Date().toISOString(),
    roles: [{ id: 3, name: 'User' }]
  }
}

/**
 * Format date
 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

