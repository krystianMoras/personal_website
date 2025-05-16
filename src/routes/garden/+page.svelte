<script>
  // no special script needed for static background
</script>

<svelte:head>
	<title>My Digital Garden</title>
	<meta name="description" content="Digital garden" />
</svelte:head>

<!-- Garden Background -->
<div class="garden-background">
  <div class="grass"></div>

  <div class="flower flower1">
    <div class="stem"></div>
    <div class="petal petal1"></div>
    <div class="petal petal2"></div>
    <div class="petal petal3"></div>
    <div class="petal petal4"></div>
    <div class="petal petal5"></div>
    <div class="center"></div>
  </div>

  <div class="flower flower2">
    <div class="stem"></div>
    <div class="petal petal1"></div>
    <div class="petal petal2"></div>
    <div class="petal petal3"></div>
    <div class="petal petal4"></div>
    <div class="petal petal5"></div>
    <div class="center"></div>
  </div>

  <div class="flower flower3">
    <div class="stem"></div>
    <div class="petal petal1"></div>
    <div class="petal petal2"></div>
    <div class="petal petal3"></div>
    <div class="petal petal4"></div>
    <div class="petal petal5"></div>
    <div class="center"></div>
  </div>

  <div class="flower flower4">
    <div class="stem"></div>
    <div class="petal petal1"></div>
    <div class="petal petal2"></div>
    <div class="petal petal3"></div>
    <div class="petal petal4"></div>
    <div class="petal petal5"></div>
    <div class="center"></div>
  </div>

  <div class="flower flower5">
    <div class="stem"></div>
    <div class="petal petal1"></div>
    <div class="petal petal2"></div>
    <div class="petal petal3"></div>
    <div class="petal petal4"></div>
    <div class="petal petal5"></div>
    <div class="center"></div>
  </div>
</div>

<!-- Your page content -->
<div class="text-column">
  <!-- Your text content here -->
</div>

<style>
  /* Make garden background fill viewport */
  .garden-background {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: -1; /* behind content */
    background: linear-gradient(to top, #87ceeb 0%, #ccefff 100%);
  }

  .grass {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 150px;
    background: linear-gradient(to top, #228B22 0%, #7CFC00 100%);
    box-shadow:
      20px 0 0 #32CD32,
      40px 0 0 #2E8B57,
      60px 0 0 #228B22;
  }

  .flower {
    position: absolute;
    bottom: 150px;
    width: 20px;
    height: 60px;
  }

  .stem {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 4px;
    height: 40px;
    background: #006400;
    margin-left: -2px;
  }

  .petal {
    position: absolute;
    width: 15px;
    height: 15px;
    background: #FF69B4;
    border-radius: 50%;
  }

  .petal1 {
    top: 0;
    left: 50%;
    margin-left: -7.5px;
  }

  .petal2 {
    top: 7px;
    left: 15%;
  }

  .petal3 {
    top: 7px;
    right: 15%;
  }

  .petal4 {
    top: 15px;
    left: 30%;
  }

  .petal5 {
    top: 15px;
    right: 30%;
  }

  .center {
    position: absolute;
    top: 10px;
    left: 50%;
    width: 12px;
    height: 12px;
    margin-left: -6px;
    background: yellow;
    border-radius: 50%;
    box-shadow: 0 0 5px #FFD700;
  }

  /* Position each flower */
  .flower1 { left: 100px; }
  .flower2 { left: 180px; }
  .flower3 { left: 260px; }
  .flower4 { left: 320px; }
  .flower5 { left: 400px; }

  /* Make sure text is readable */
  .text-column {
    position: relative;
    z-index: 1;
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
  }
</style>
