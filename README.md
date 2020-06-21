# MMM-MyMinecraft
<p>Module for the wonderful MagicMirror from MichMich
<br>It will display in a table, these server informations :

<li> message of the day</li>
<li> player online/player max</li>
<li> latency</li>
<li> version</li>
<li> protocol</li>
It works better in 'middle_center' or 'lower_third' module position.
<br>
</p>


# Dependencies
<p>
<li> minecraft-protocol : ^1.12.2</li>
</p>

## I. First Step
<p>Run these commands at your Magic Mirror root directory.</p>

<div>
 <code><p>cd ~/MagicMirror/modules</p>
<p> git clone https://github.com/framboise-pi/MMM-MySenseHat.git</p></code>
</div>
<div>
 <p>This command with MMM-MySenseHat folder (this will install dependencies)</p>
<code>npm install</code>
</div>

## II. Second Step
<p>edit your config.js file from MagicMirror config folder</p>
<div class="highlight highlight-source-js"><pre>  
//////////////////////
// MY MINECRAFT
//////////////////////
modules: <span class="pl-kos">[</span>
<span class="pl-kos">{</span>
 <span class="pl-c1">disabled</span>: <span class="pl-s">false</span><span class="pl-kos">,</span>
 <span class="pl-c1">module</span>: <span class="pl-s">"MMM-MyMinecraft"</span><span class="pl-kos">,</span>
 <span class="pl-c1">position</span>: <span class="pl-s">"middle_center"</span><span class="pl-kos">,</span>  
  <span class="pl-c1">config</span>: <span class="pl-kos">{</span>
   <span class="pl-c">ping_interval</span>: <span class="pl-s">5</span><span class="pl-kos">,//in seconds</span>
   <span class="pl-c">slide_interval</span>: <span class="pl-s">30</span><span class="pl-kos">//in seconds</span>
  <span class="pl-kos">}</span>
 <span class="pl-kos">}</span>
<span class="pl-kos">]</span>
</pre></div>
----------------------------------------------------

# Configuration
<p>edit <code>servers.json</code> to add/remove servers
</p>

# Screenshots

# Todo
