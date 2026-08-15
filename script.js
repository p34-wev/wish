document.addEventListener('DOMContentLoaded', function(){
  const scrlor = document.querySelector('#orange');
  const scrlgr = document.querySelector('#green');
  const wheel = document.querySelector('#wheel') || document.querySelector('.wheel');
  const DEFAULT_NAME = 'Priyanshi Srivastava';

  // parse URL params for shared name/wish
  const params = new URLSearchParams(window.location.search);
  const urlName = params.get('name');
  const urlWish = params.get('wish');

  function sanitize(text){
    return String(text).replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // Apply shared name/wish if present
  if(urlName){
    const line2 = document.querySelector('#greeting .line2');
    if(line2) line2.innerHTML = `from <strong>${sanitize(urlName)}</strong>`;
  }
  if(urlWish){
    const wishEl = document.getElementById('sharedWish');
    // if there's a wish but no name, show the wish as a slogan in the main greeting
    if(!urlName){
      const line1 = document.querySelector('#greeting .line1');
      const line2 = document.querySelector('#greeting .line2');
      if(line1) line1.textContent = sanitize(urlWish);
      if(line2) line2.style.display = 'none';
      if(wishEl) { wishEl.textContent = ''; }
    } else {
      if(wishEl) wishEl.textContent = sanitize(urlWish);
    }
  }

  const orstart = new Promise((res, rej) => {
    setTimeout(() => {
      if (scrlor && scrlor.style.animation != 'var(--orange)') {
        scrlor.style.animation = 'var(--orange)';
        res('orange scrolled');
      } else {
        rej('function not working');
      }
    }, 100);
  });

  const grstart = () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (scrlor && scrlor.style.animation == 'var(--orange)') {
          if(scrlgr) scrlgr.style.animation = 'var(--green)';
          res('green scrolled');
        } else {
          rej('function not working');
        }
      }, 500);
    });
  };

  const wheelshow = () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (scrlgr && scrlgr.style.animation == 'var(--green)') {
          if (wheel) wheel.style.display = 'flex';
            // removed automatic text insertions into the flag stripes
          res('happy independence day');
        } else {
          rej('last function not working');
        }
      }, 4600);
    });
  };

  orstart
    .then((data) => {
      console.log(data);
      return grstart();
    })
    .then((blue) => {
      console.log(blue);
      return wheelshow();
    })
    .then((wheel) => {
      console.log(wheel);
    })
    .catch((data) => {
      console.log(data);
    });

  // only add sticks dynamically if wheel is a normal element (not our SVG chakra)
  if (wheel && wheel.tagName && wheel.tagName.toLowerCase() !== 'svg'){
    for (let e = 1; e <= 12; e++) {
      let angl = e * 15;
      let sticker = document.createElement('i');
      sticker.className = 'stick';
      sticker.style.transform = `rotateZ(${angl}deg)`;
      wheel.appendChild(sticker);
    }
  }

  // name input removed — no form handlers or localStorage used for name

});
 