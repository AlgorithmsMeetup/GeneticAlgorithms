#Genetic algorithms

Genetic algorithms take an initial population, select survivors, mutate them, and repeat the process until a goal state is reached or resources are exhausted.

##Steps
For example, consider some problem where that involves selecting an ideal 9-character string, e.g. 'abcdefghi'.

####Initial generation
To begin, we generate an initial **generation** of x=2 **bloodlines**\*, each with n=3 random **offspring**.
```
[['abcdefgai', 'abcdxfghi', 'wtrbekvkl'], ['helaworad', 'awfluehsk', 'seklfkese']]
```
*to make things easier, we suggest you begin by ignoring bloodlines (ie 1 generation = 1 bloodline).
####Select survivors via fitness function
From each **bloodline** we select a **survivor** based on a **fitness function**.
Our fitness function is related to the problem; for this arbitrary example,
let's just make it return the number of 'a' characters in the string.
```
for each bloodline:
  for each offspring:
    apply the fitness function
  select the top offspring
['abcdefgai', 'helaworad']
return top survivor if the goal condition was met or if resources have been exhausted.
```
####Spawn and mutate offspring
Now we create offspring from these survivors; we do this by copying and **mutating** each survivor n times.
In our example, mutating will mean replacing one character with a random character.
```
for each survivor:
  create n offspring by copying the survivor and mutating that copy
these offspring are the new generation
[['zbcdefgai', 'abcdefgao', 'abcaefgai'], ['helawozad', 'heaaworad', 'hexaworad']]
```
####Repeat
Repeat the select and spawn/mutate steps until either a **goal is met** or **resources have been exhausted**.
A goal condition could be, for example, at least 5 'a' characters in the string.
Resources could be CPU cycles, time, or some other consumable unit; perhaps 1000 would be an appropriate limit.

That's all there is to it!

##Notes
Genetic algorithms are useful for converging on 'good not perfect' solutions more quickly than brute force solutions.
If an obvious fitness function is available, that may be a sign that genetic algorithms are a viable approach.

Keep in mind that genetic algorithms are not guaranteed to (and most likely won't) find the *perfect* solution,
so only use this approach when there are strong resource constraints or approximations are acceptable.
