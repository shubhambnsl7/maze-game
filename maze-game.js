// Define the maze structure, 1 represents walls, and 0 represents empty spaces
const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  
  // Players' positions
  let player = { x: 1, y: 1 };
  
  // Canvas and context variables
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  
  // Constants
  let tileSize;
  let mazeWidth;
  let mazeHeight;
  
  // Function to calculate the tile size and redraw the maze
  function calculateTileSize() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
  
    // Calculate the maximum tile size that fits the maze within the screen
    tileSize = Math.min(Math.floor(screenWidth / maze[0].length), Math.floor(screenHeight / maze.length));
    
    // Calculate the maze dimensions based on the new tile size
    mazeWidth = maze[0].length;
    mazeHeight = maze.length;
  
    // Resize the canvas to fit the maze
    canvas.width = mazeWidth * tileSize;
    canvas.height = mazeHeight * tileSize;
  
    drawMaze();
  }
  
  // Function to draw the maze
  function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    for (let y = 0; y < mazeHeight; y++) {
      for (let x = 0; x < mazeWidth; x++) {
        if (maze[y][x] === 1) {
          ctx.fillStyle = 'black';
        } else {
          ctx.fillStyle = 'white';
        }
  
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  
    // Draw player
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
  }
  
  // Function to handle touch events for player movement
  function handleTouch(event) {
    event.preventDefault();
  
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
  
    // Calculate the grid position based on the touch coordinates
    const gridX = Math.floor(touchX / tileSize);
    const gridY = Math.floor(touchY / tileSize);
  
    // Calculate the movement direction
    const dx = gridX - player.x;
    const dy = gridY - player.y;
  
    // Check if the new position is within the maze bounds and not a wall (1)
    if (
      player.x + dx >= 0 &&
      player.x + dx < mazeWidth &&
      player.y + dy >= 0 &&
      player.y + dy < mazeHeight &&
      maze[player.y + dy][player.x + dx] !== 1
    ) {
      player.x += dx;
      player.y += dy;
    }
  
    drawMaze();
  }
  
  // Event listener for touch events to control the player
  canvas.addEventListener('touchstart', handleTouch);
  canvas.addEventListener('touchmove', handleTouch);
  
  // Initial setup and drawing of the maze
  calculateTileSize();  