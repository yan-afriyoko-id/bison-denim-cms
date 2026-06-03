<template>
  <footer id="footer" class="footer">
    <div class="copyright">
      &copy; Copyright <strong><span>Bison Denim</span></strong>. All Rights Reserved
    </div>
   
  </footer>

  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"
    ><i class="bi bi-arrow-up-short"></i
  ></a>
</template>

<script setup lang="ts">
// Footer component
</script>

<style scoped>
.footer,
.copyright,
.copyright span,
.copyright strong {
  color: #000 !important;
}

.back-to-top {
  position: fixed;
  right: 15px;
  bottom: 15px;
  z-index: 996;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #000 !important;
  color: #fff !important;
  border: 1px solid #000;
  transition: all 0.4s;
}

.back-to-top:hover {
  background: #1f1f1f !important;
  color: #fff !important;
  border-color: #1f1f1f;
  bottom: 20px;
}
</style>
