# PRODUCTION COUNTER


[working demo](https://osmiogrzesznik.github.io/produccio/index22.html)

## Estimates order finish time, capability, draws production graph. Indicates and counts machine downtime.

This is private project, solving issue of predicting approximate time of finishing job orders. 
When asked how long job batch production will take , just fire produccio up and keep pressing green button every cycle. Produccio will measure Button To Button (BTB) time and calculate prediction of every interesting aspect of job order.  Enables fine-grain control over the amount of parts produced every cycle and quick calculation involving break times or previously made parts.

## 
Before you start, if you are continuing production and some parts have
been done so far, or you have measured BTB cycle already you may provide
these information to get more accurate estimates right away. However it
is entirely optional, and program will run statistics normally even
without these data, you may acquire better results and have more
options, providing some of it.
DEV W.I.P NOTES:

BUGs to do:
-SAVE DON'T WORK FOR CHART.JS MODULE(DOESN'T EVEN CREATE CANVAS FOR IT
)
-taking break at start breaks averager?
TO DO:
- cycles doesn't have to equal parts. i.e. 1cycle may produce one pair.
preset must include it
- availability to plan multiple different jobs one after another, plus
break, setting time**

![animation of working app](/sample-imgs/produccio-0.gif)
