---
series: Demystifying Deep Learning 
title: Demystifying Deep Learning Primer
<<<<<<< HEAD
part: Part 0
comments: true
date:   2018-08-25 10:00:00
part: 0
>>>>>>> 6c1ada2... Remove unnecessary fields in front-matter of blog posts
date:   2018-07-25 10:00:00
image: "./why-maths.jpg"
excerpt: Motivation for the series - why bother with the maths behind deep learning?
redirect_from: /2018/07/25/DemystifyingDeepLearningPrimer.html
---

## Why bother with the maths behind deep learning?

Deep learning has been getting more powerful with the advent of more data and computational power. It has been able to achieve previously impossible feats for a computer such as succeeding at the game of Go, and has become ubiquitous in our daily lives, from the voice assistants in our phones, to recommender systems used by Amazon and Netflix, to the automatic generation of video captions by Youtube.

The barrier of entry to deep learning has also been going down, with numerous online courses teaching how to apply deep learning. Deep learning frameworks like *Keras* have reduced the incidental complexity of implementing these deep learning models to just a few lines of code and abstracted away the internals of these networks. With pretrained models also readily available on GitHub it seems just about anyone with enough data and enough GPU time can apply deep learning right?

**Not so fast.**

There is a growing concern over the interpretability of neural networks as they are being used in increasingly large-scale and high-profile cases, such as self-driving cars and in healthcare. One fear is that the neural networks can behave in unexpected ways, and are susceptible to adversarial attacks and may not be robust enough. 

Andrej Karpathy also has an excellent [blog post](https://medium.com/@karpathy/yes-you-should-understand-backprop-e2f06eab496b) on how the frameworks often provide a leaky abstraction. 

Thus, to diagnose these stumbling blocks in the learning process and being able to reason about the networks, we need to dive into the maths behind the algorithms. 

## But maths is intimidating? Don't you need a PhD?

At first glance, I'd be inclined to agree with you. I've found from personal experience that there is a divide between  most online practical deep learning courses and the deep learning research papers. The courses don't tend to go over the maths in much detail, often stating the equations, giving some brief hand-wavey intuition or just ignoring the maths completely and applying these algorithms out-of-the-box. They are often targeting a broad audience who don't need to necessarily know or care about all the maths.

The research papers appear intimidating because they are intended for other researchers who already have a proficient background in maths, having completed an undergraduate degree and pursuing or having completed a PhD. They can often appear to skip or assume key steps, thus seeming inaccessible to most. 

## How then do you bridge the gap between academia and practical courses?

The aim of this series is to reason about deep learning from **first principles**, so as to intuititively understand why a particular formula is such, and then to consolidate this learning by implementing the models with a motivating example. This means that you don't need an advanced maths background - *we will build up the knowledge required as we go along*.

To start with, we will avoid the abstractions of deep learning frameworks, and code the core neural networks from scratch to really get a feel for the maths behind them. 

Having done this, we will apply the principles we have learnt to more complex neural networks, taking advantage of the frameworks to reduce the incidental complexity of implementing these networks. 

I would really appreciate any feedback on what you would like to see from such a series and on the posts already published on the website.
