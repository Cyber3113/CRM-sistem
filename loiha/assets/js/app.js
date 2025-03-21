document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const sidebarToggler = document.getElementById("sidebar-toggler");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const darkModeIcon = document.getElementById("darkModeIcon");
  
    // Dark mode saqlangan holatini tekshirish
    if (localStorage.getItem("dark-mode") === "enabled") {
      enableDarkMode();
    }
  
    // Sidebar toggle - faqat tugmani bosganda ochiladi
    sidebarToggler.addEventListener("click", function () {
      sidebar.classList.toggle("expanded");
    });

    // Sidebarni tashqarisiga bosilganda yopish
    document.addEventListener("click", function (event) {
      if (!sidebar.contains(event.target) && !sidebarToggler.contains(event.target)) {
          sidebar.classList.remove("expanded");
      }
  });

  
    // Dark mode toggle
    darkModeToggle.addEventListener("click", function () {
      if (document.body.classList.contains("dark-mode")) {
        disableDarkMode();
      } else {
        enableDarkMode();
      }
    });
  
    function enableDarkMode() {
      document.body.classList.add("dark-mode");
      darkModeIcon.classList.remove("fa-moon");
      darkModeIcon.classList.add("fa-sun");
      localStorage.setItem("dark-mode", "enabled");
    }
  
    function disableDarkMode() {
      document.body.classList.remove("dark-mode");
      darkModeIcon.classList.remove("fa-sun");
      darkModeIcon.classList.add("fa-moon");
      localStorage.setItem("dark-mode", "disabled");
    }
  });

  
  document.addEventListener("DOMContentLoaded", function () {
    // Grafik konteynerlar to‘liq yuklanishini kutish
    setTimeout(() => {
      // Bar Chart
      const barCtx = document.getElementById('barChart').getContext('2d');
      new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Foyda',
              data: [3.5, 2.8, 8.5, 6.3, 3.4, 9.2, 4.1, 5.6, 7.3, 9.1, 6.7, 7.8],
              backgroundColor: 'red'
            },
            {
              label: 'Daromad',
              data: [4.2, 3.1, 7.6, 5.9, 4.2, 6.8, 2.9, 6.2, 8.1, 7.5, 5.4, 4.3],
              backgroundColor: 'orange'
            }
          ]
        }
      });
  
      // Pie Chart
      const pieCtx = document.getElementById('pieChart').getContext('2d');
      new Chart(pieCtx, {
        type: 'pie',
        data: {
          labels: ['Facebook', 'Twitter', 'YouTube', 'Google+'],
          datasets: [{
            data: [25, 15, 30, 30],
            backgroundColor: ['#3b5998', '#00acee', '#c4302b', '#d9534f']
          }]
        }
      });
    }, 500); // 0.5 soniyadan keyin yuklash
  });

  
  document.addEventListener("DOMContentLoaded", function () {
    // Line Chart
    const lineCanvas = document.getElementById('lineChart').getContext('2d');
    new Chart(lineCanvas, {
      type: 'line',
      data: {
        labels: ['2001', '2002', '2003', '2004', '2005', '2006', '2007'],
        datasets: [
          {
            label: 'Phone',
            data: [0, 50, 30, 60, 150, 80, 10],
            borderColor: '#00c0ef',
            backgroundColor: 'rgba(0, 192, 239, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointBackgroundColor: '#00c0ef'
          },
          {
            label: 'Windows',
            data: [0, 40, 20, 50, 40, 70, 10],
            borderColor: '#5df63b',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointBackgroundColor: '#5df63b'
          },
          {
            label: 'Mac',
            data: [0, 70, 50, 40, 120, 90, 20],
            borderColor: '#D32F2F',
            backgroundColor: 'rgba(211, 47, 47, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointBackgroundColor: '#D32F2F'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
              }
            }
          }
        }
      }
    });
  
    // Pie Chart
    const pieCanvas2 = document.getElementById('pieChart2').getContext('2d');
    new Chart(pieCanvas2, {
      type: 'pie',
      data: {
        labels: ['Facebook', 'Twitter', 'YouTube', 'Google+'],
        datasets: [{
          data: [30, 20, 35, 15],
          backgroundColor: ['#3b5998', '#00acee', '#c4302b', '#d9534f']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    // Stacked Bar Chart
    const stackedBarCanvas = document.getElementById('stackedBarChart').getContext('2d');
    new Chart(stackedBarCanvas, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Red',
            data: [12, 12, 12, 12, 12, 12, 12],
            backgroundColor: '#FF0000'
          },
          {
            label: 'Green',
            data: [12, 12, 12, 12, 12, 12, 12],
            backgroundColor: '#5df63b'
          },
          {
            label: 'Blue',
            data: [12, 12, 12, 12, 12, 12, 12],
            backgroundColor: '#1976D2'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
              }
            }
          }
        },
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
    });
  
    // Pie Chart (Boshqa ranglar bilan)
    const newPieCanvas = document.getElementById('newPieChart').getContext('2d');
    new Chart(newPieCanvas, {
      type: 'pie',
      data: {
        labels: ['Category A', 'Category B', 'Category C', 'Category D'],
        datasets: [{
          data: [30, 25, 20, 25],
          backgroundColor: ['#FF5733', '#C70039', '#900C3F', '#581845']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            placement: 'right', // Tooltip faqat o‘ng tomondan chiqadi
            customClass: 'tooltip' // CSS dagi maxsus class ishlatiladi
        });
    });
});

function openModal(title) {
  document.getElementById('modal-title').innerText = title;
  document.getElementById('modal').style.display = 'flex';
}
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}