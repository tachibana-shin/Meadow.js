/*!
 * meadow.js v1.1.3
 * (c) 2020 Nguyen Thanh
 * Released under the MIT License.
 */
!function ( global, factory ) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory();
    } else {
        global.Meadow = factory();
    }
}(this || self, () => {
"use strict"
let path = "images"
let BIRDS = ["greenbird", "bluebird", "redbird", "ufo"]
let CLASS_PUBLIC = "_" + Math.random().toString().replace(/\./g, "")

function random(_1, _2) {
    if (arguments.length === 1)
		return "length" in _1 ? _1[
			Math.floor(Math.random() * (_1.length))
		] : Math.random() * _1

    if (arguments.length === 2)
		return _1 + Math.random() * (_2 - _1)
}
function getWidth(el) {
    return parseFloat(window.getComputedStyle(el).width)
}
function getHeight(el) {
    return parseFloat(window.getComputedStyle(el).height)
}
function exCSS(r) {
	return document.documentElement.style[r]!=null
}
let mprefix = ' -webkit- -moz- -ms- -o- -khtml-'.split(' '),
	xprefix = /\-(?:webkit|moz|ms|o|khtml)\-/i,
	_prefix = mprefix.length
function prefix(r) {
	r = r.replace(xprefix, '')
	var i = 0;
	while(i < _prefix) {
		if (exCSS(mprefix[i] + r)) 				return mprefix[i] + r; i++
	}
	return undefined
}

function domify(html) {
    let vnode = document.createElement("div")
	vnode.innerHTML = html
	return vnode.children[0]
}
function getPrefix() {
   return prefix("animation").replace("animation", "")
}

const device = {
    get ww() {
		return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
	},
	get wh() {
		return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
	}
}
let requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (e) {
	window.setTimeout(e, 100/6)
}
class BirdFly {
	constructor(el, style) {
		this.$el = el
		this.$style = style
		let d = Math.random()
		if ( d < 0.5 )
			this.x = -getWidth(this.$el)
		else this.x = device.ww
		
		if ( this.x > 0 )
			this.reverse()
		
		this.y = random(0, device.wh)
		this.speedX = d < 0.5 ? 1 : -1
		this.speedY = this.y < device.wh / 2 ? random(0.5, 2) : random(-0.5, -2)

		this.update()
	}
	reverse() {
		this.$el.style[prefix("transform")] = `rotateY(180deg)`
	}
	draw() {
		this.$el.style.top = this.y + "px"
		this.$el.style.left = this.x + "px"
	}
	update() {
	 	 if ( this.x > device.ww || this.y + getHeight(this.$el) < 0 || this.y > device.wh) {
			 this.$el.remove()
			 this.$style.remove()
			 return
		 }
		this.draw()
		
		this.x += this.speedX
		this.y += this.speedY
		requestAnimationFrame(this.update.bind(this))
	}
}

function createBird(url) {
   let name = random(BIRDS)
	let width, height, key = Math.random().toString().replace(/\./g, "")
	
	if ( name == "deliverybird" || name == "redbird" )
		width = 24
	else width = height = 33
	
	if ( name == "deliverybird" )
		height = 30
	if ( name == "redbird" )
		height = 27
	
	let style = `
	._${key}-${name}-parent {
		width: ${width}px;
		height: ${height}px;
		position: fixed;
		point-events: none;
		z-index: ${9e99};
	}
	._${key}-${name} {
		width: ${width}px;
		height: ${height}px;
		background: url("${url}/${name}_0.png") 100% center no-repeat;
		${prefix("animation")}: _${key}-${name}-animate .35s linear infinite;
	}

	@${getPrefix()}keyframes _${key}-${name}-animate {
		0% {
			background-image: url("${url}/${name}_0.png");
			${prefix("transform")}: translateY(-3px);
		}
		17% {
			background-image: url("${url}/${name}_1.png");
			${prefix("transform")}: translateY(-2px);
		}
		34% {
			background-image: url("${url}/${name}_2.png");
			${prefix("transform")}: translateY(-1px);
		}
		51% {
			background-image: url("${url}/${name}_ground.png")
			${prefix("transform")}: translateY(0px);
		}
		68% {
			background-image: url("${url}/${name}_2.png");
			${prefix("transform")}: translateY(-1px);
		}
		85% {
			background-image: url("${url}/${name}_1.png");
			${prefix("transform")}: translateY(-2px);
		}
		100% {
			background-image: url("${url}/${name}_0.png");
			${prefix("transform")}: translateY(-3px);
		}
	}`
	
	let _style = domify(`<style type="text/css" data-id="${key}-css"></style>`)
	_style.innerHTML = (style)
	document.head.appendChild(_style)
	let el = domify(`<div class="_${key}-${name}-parent _${CLASS_PUBLIC}-bird">
		<div class="_${key}-${name}"></div>
	</div>`)
	document.body.appendChild(el)

	try {
		new BirdFly(el, _style)
	} catch(e) {
		console.log(e + "")
	}
	return key
}

function _createBird() {
	createBird(path)
	setTimeout(() => document.querySelectorAll(`._${CLASS_PUBLIC}-bird`).length < 2 && _createBird(), random(5000, 10000))
}

function getCount(array, value) {
	return array.reduce((a, b) => a + (b == value), 0)
}

function getItems() {
	let res = []
	
	for ( let i = 0; i < device.ww / 36; i++ ) {
		let val = Math.round(
			random(0, 20)
		)
		if ( getCount(res, val) > 1 ) {
			i--
			continue
		}
		res.push(val)
	}
	
	return res
}


let items = getItems()
function createGardens() {
    let key = Math.random().toString().replace(/\./g, "")
    
    let el = `
    	<div class="fixed-bottom text-center mx-0 px-0 _${CLASS_PUBLIC}-gardens" style="point-events: none;z-index: ${9e99};">` + items.map((e, index) => {
			let deg = random(-25.7, 25.7)
			return `
			<img class="mr-2 ${index == 0 ? 'ml-0 ' : index == 8 ? 'mr-0 ' : ''}_${key}-gardents-item-${index}"
				src="${path}/plant_${e}.png">
			<style type="text/css">
				
    			._${key}-gardents-item-${index} {
					${prefix("transform-origin")}: center bottom;
					${prefix("transform")}: rotate(${deg}deg) translateY(3px);
					${prefix("animation")}: _${key}-gardents-item-${index}-animate 5s ease-in-out 100;
				}
				
				@${getPrefix()}keyframes _${key}-gardents-item-${index}-animate {
    				0%, 100% {
    				    ${prefix("transform")}: rotate(${deg}deg) translateX(${deg > 0 ? 3 : -3}px) translateY(3px);
    				}
    				50% {
    				    ${prefix("transform")}: rotate(${-deg}deg) translateX(${deg > 0 ? -3 : 3}px) translateY(3px);
    				}
				}
			</style>
				`
			}).join("\n") + `
		</div>
    `
    //console.log( el )
    document.body.appendChild(domify(el))
}

let methods = {
    createBird: _createBird,
    createGardens: createGardens,
    _createBird: createBird,
    all() {
        this.createBird()
        this.createGardens()
    },
    set path(e) {
        path = e
    },
    get path() {
        return path
    },
    set birds(e) {
        BIRDS = e
    },
    get birds() {
        return BIRDS
    },
    remove() {
        [].slice.call(
        	document.querySelectorAll("._" + CLASS_PUBLIC + "-gardens")
        ).forEach(e => e.remove())
    },
    update() {
        let length = ~~(device.ww / 36) + 1

        if ( items.length > length ) {
			 items = items.slice(0, 9)
		 } else {
		    for ( let i = 0; i < length - items.length; i++ ) {
				let val = Math.round(
					random(0, 20)
				)
				if ( getCount(items, val) > 1 ) {
					i--
					continue
				}
				items.push(val)
			}
		 }

		 methods.remove()
		 methods.createGardens()
    },
    set resize(e) {
        if ( e === false ) {
        	window.removeEventListener("resize", this.update)
           window.removeEventListener("orientationchange", this.update)
        }
    }
}

window.addEventListener("resize", methods.update)
window.addEventListener("orientationchange", methods.update)

return methods
})
