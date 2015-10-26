define(["durandal/system"],function(t){var i=/\s+/,e=function(){},o=function(t,i){this.owner=t,this.events=i};return o.prototype.then=function(t,i){return this.callback=t||this.callback,this.context=i||this.context,this.callback?(this.owner.on(this.events,this.callback,this.context),this):this},o.prototype.on=o.prototype.then,o.prototype.off=function(){return this.owner.off(this.events,this.callback,this.context),this},e.prototype.on=function(t,e,r){var n,s,h;if(e){for(n=this.callbacks||(this.callbacks={}),t=t.split(i);s=t.shift();)h=n[s]||(n[s]=[]),h.push(e,r);return this}return new o(this,t)},e.prototype.off=function(e,o,r){var n,s,h,c;if(!(s=this.callbacks))return this;if(!(e||o||r))return delete this.callbacks,this;for(e=e?e.split(i):t.keys(s);n=e.shift();)if((h=s[n])&&(o||r))for(c=h.length-2;c>=0;c-=2)o&&h[c]!==o||r&&h[c+1]!==r||h.splice(c,2);else delete s[n];return this},e.prototype.trigger=function(t){var e,o,r,n,s,h,c,f;if(!(o=this.callbacks))return this;for(f=[],t=t.split(i),n=1,s=arguments.length;s>n;n++)f[n-1]=arguments[n];for(;e=t.shift();){if((c=o.all)&&(c=c.slice()),(r=o[e])&&(r=r.slice()),r)for(n=0,s=r.length;s>n;n+=2)r[n].apply(r[n+1]||this,f);if(c)for(h=[e].concat(f),n=0,s=c.length;s>n;n+=2)c[n].apply(c[n+1]||this,h)}return this},e.prototype.proxy=function(t){var i=this;return function(e){i.trigger(t,e)}},e.includeIn=function(t){t.on=e.prototype.on,t.off=e.prototype.off,t.trigger=e.prototype.trigger,t.proxy=e.prototype.proxy},e});