<template>
  <footer class="bg-dark text-light py-5 mt-5">
    <div class="container">
      <div class="row">
        <!-- Brand Section -->
        <div class="col-md-4 mb-4">
          <h5 class="mb-3">
            <i class="bi bi-shop me-2"></i>
            Bison Denim
          </h5>
          <p class="text-muted small">
        <span style="color: white !important;">Professional Admin Dashboard for Managing Your Business with modern UI and powerful features.</span>
          </p>
          <div class="social-links mt-3">
            <a href="#" class="text-light me-3" title="Facebook">
              <i class="bi bi-facebook"></i>
            </a>
            <a href="#" class="text-light me-3" title="Twitter">
              <i class="bi bi-twitter"></i>
            </a>
            <a href="#" class="text-light me-3" title="Instagram">
              <i class="bi bi-instagram"></i>
            </a>
            <a href="#" class="text-light" title="LinkedIn">
              <i class="bi bi-linkedin"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="col-md-4 mb-4">
          <h5 class="mb-3">Quick Links</h5>
          <ul class="list-unstyled">
            <li><a href="/about" class="text-muted text-decoration-none"><span  style="color: white !important;">About Us</span></a></li>
            <li><a href="#products" class="text-muted text-decoration-none"><span  style="color: white !important;">Products</span></a></li>
            <li><a href="/terms-and-conditions" class="text-muted text-decoration-none"><span  style="color: white !important;">Terms & Conditions</span></a></li>
            <li><a href="/privacy-policy" class="text-muted text-decoration-none"><span  style="color: white !important;">Privacy Policy</span></a></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="col-md-4 mb-4">
          <h5 class="mb-3">Contact Info</h5>
          <ul class="list-unstyled text-muted small">
            <li class="mb-2">
              <i class="bi bi-geo-alt me-2"></i>
             <span style="color: white !important;">Jakarta, Indonesia</span>
            </li>
            <li class="mb-2" style="color: white !important;">
              <i class="bi bi-telephone me-2"></i>
              <span style="color: white !important;">+62-XXX-XXXX-XXXX</span>
            </li>
            <li class="mb-2" style="color: white !important;">
              <i class="bi bi-envelope me-2"></i>
              <span style="color: white !important;">support@bisondenim.com</span>
            </li>
          </ul>
        </div>
      </div>

      <hr class="bg-secondary" />

      <!-- Copyright -->
      <div class="row">
        <div class="col-md-6 text-muted small">
         <span style="color: white !important;"> &copy; 2025 Bison Denim. All rights reserved.</span>
        </div>
        <div class="col-md-6 text-end text-muted small">
       <span style="color: white !important;">  Made with <i class="bi bi-heart-fill text-danger"></i> by Bison Denim Team</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
footer {
  margin-top: auto;
}

a {
  transition: opacity 0.3s;
}

a:hover {
  opacity: 0.8;
}

.social-links a {
  font-size: 20px;
  display: inline-block;
}
</style>


