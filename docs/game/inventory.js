"use strict";class Inventory{constructor(){this.tiles=[],this.gui=new Ui,this.page=0,this.lastSize={x:NaN,y:NaN},this.tileCounter=0,this.createTile=this.gui.addElement(new Button(vpSize.x-2*camera.zoom,.5*camera.zoom,1.5*camera.zoom,.375*camera.zoom,document.getElementById("buttonImage"),()=>{console.log("boop!")}))}addTile(e){const i={ruid:e,originY:(this.tileCounter+1)*camera.zoom*1.25,id:this.tileCounter};this.tileCounter++,world.loadTile(e,t=>{i.dragable=new Dragable(vpSize.x-1.75*camera.zoom,0,64,64,t.imageTag,(function(t,a){this.x=vpSize.x-1.75*camera.zoom,this.y=i.originY;const o=camera.toWorld(t,a);socket.emit("WorldSetTile",Math.round(o.x),Math.round(o.y),e)})),this.gui.addElement(i.dragable),this.tiles[i.id]=i,this.lastSize={x:NaN,y:NaN}})}draw(){if(this.lastSize.x!==vpSize.x||this.lastSize.y!==vpSize.y){for(const e of Object.values(this.tiles))e.dragable.x=vpSize.x-1.75*camera.zoom,e.dragable.y=e.originY;this.lastSize.x=vpSize.x,this.lastSize.y=vpSize.y,this.gui.elements[0].x=vpSize.x-2*camera.zoom}canvasContext.fillStyle="rgba(0.04, 0.02, 0, 0.4)",canvasContext.fillRect(vpSize.x-2.25*camera.zoom,.25*camera.zoom,2*camera.zoom,vpSize.y-.5*camera.zoom),this.gui.draw()}}