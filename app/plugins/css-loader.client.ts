export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    const route = useRoute()
    
    // Fungsi untuk load CSS Bootstrap (untuk admin)
    const loadBootstrapCSS = () => {
      const existingLink = document.querySelector('link[data-bootstrap-css]')
      if (existingLink) return
      
      const links = [
        { href: '/assets/vendor/bootstrap/css/bootstrap.min.css', id: 'bootstrap-css' },
        { href: '/assets/vendor/bootstrap-icons/bootstrap-icons.css', id: 'bootstrap-icons-css' },
        { href: '/assets/vendor/boxicons/css/boxicons.min.css', id: 'boxicons-css' },
        { href: '/assets/vendor/quill/quill.snow.css', id: 'quill-snow-css' },
        { href: '/assets/vendor/quill/quill.bubble.css', id: 'quill-bubble-css' },
        { href: '/assets/vendor/remixicon/remixicon.css', id: 'remixicon-css' },
        { href: '/assets/vendor/simple-datatables/style.css', id: 'datatables-css' },
        { href: '/assets/css/style.css', id: 'template-css' }
      ]
      
      links.forEach(link => {
        const linkEl = document.createElement('link')
        linkEl.rel = 'stylesheet'
        linkEl.href = link.href
        linkEl.id = link.id
        linkEl.setAttribute('data-bootstrap-css', 'true')
        document.head.appendChild(linkEl)
      })
    }
    
    const unloadBootstrapCSS = () => {
      const bootstrapLinks = document.querySelectorAll('link[data-bootstrap-css]')
      bootstrapLinks.forEach(link => link.remove())
    }
    
    const loadBootstrapScripts = () => {
      const scripts = [
        { src: '/assets/vendor/apexcharts/apexcharts.min.js', id: 'apexcharts-js' },
        { src: '/assets/vendor/bootstrap/js/bootstrap.bundle.min.js', id: 'bootstrap-js' },
        { src: '/assets/vendor/chart.js/chart.umd.js', id: 'chartjs-js' },
        { src: '/assets/vendor/echarts/echarts.min.js', id: 'echarts-js' },
        { src: '/assets/vendor/quill/quill.js', id: 'quill-js' },
        { src: '/assets/vendor/simple-datatables/simple-datatables.js', id: 'datatables-js' },
        { src: '/assets/js/main.js', id: 'main-js' }
      ]
      
      scripts.forEach(script => {
        const existingScript = document.getElementById(script.id)
        if (existingScript) return
        
        const scriptEl = document.createElement('script')
        scriptEl.src = script.src
        scriptEl.id = script.id
        scriptEl.async = true
        document.head.appendChild(scriptEl)
      })
    }
    
    const unloadBootstrapScripts = () => {
      const bootstrapScripts = [
        'apexcharts-js',
        'bootstrap-js',
        'chartjs-js',
        'echarts-js',
        'quill-js',
        'datatables-js',
        'main-js'
      ]
      
      bootstrapScripts.forEach(id => {
        const script = document.getElementById(id)
        if (script) script.remove()
      })
    }
    
    const isAdminRoute = (path: string) => {
      return path.startsWith('/admin') || 
             path.startsWith('/dashboard') ||
             path.startsWith('/users') ||
             path.startsWith('/manage-') ||
             path.startsWith('/profile') ||
             path.startsWith('/setting') ||
             path.startsWith('/settings') ||
             path === '/login' ||
             path === '/register' ||
             path === '/forgot-password' ||
             path === '/reset-password' ||
             path === '/verify-email' ||
             path === '/resend-verification'
    }
    
    const handleRouteChange = () => {
      const path = route.path
      
      if (isAdminRoute(path)) {
        loadBootstrapCSS()
        loadBootstrapScripts()
      } else {
        unloadBootstrapCSS()
        unloadBootstrapScripts()
      }
    }
    
    handleRouteChange()
    
    nuxtApp.hook('page:finish', () => {
      handleRouteChange()
    })
  }
})

