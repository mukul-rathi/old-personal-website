---
title: Demystifying Deep Learning Part 1 - What is a neural network?
layout: default
comments: true
date:   2018-08-21 10:00:00
excerpt: "Start of the series!"
---
### Introduction

Neural networks are a class of machine learning algorithms that have, in the last decade, been responsible for most of the major advances in the field of Artificial Intelligence. They are commonplace in many of the large corporations - from voice assistants such as Google Assistant and Siri to recommender systems powering Netflix and Amazon. The availabilities of large quantities of data and the rise in computational power are two of the main reasons neural networks have been become so powerful.

In this series of blog posts I aim to demystify the main types of neural networks, and delve into the maths behind these deep learning algorithms. Each post will have roughly the same format:

* **Intuition:**get an overall feel for why this works
* **Maths:** delve into the technical side and the maths that makes it work 
* **Code:** a code snippet or two detailing how to implement this and apply this.

### Terminology 

First, let's try to define what machine learning even is. *Machine learning* is the ability of computers to learn from data without being explicitly programmed. However, unlike the portrayal in the media, most machine learning algorithms are highly specialised, so are limited to performing few tasks very well - for example the AI used to detect cats and dogs in images can't then play chess. The AI world domination scenario is some way off, at least not in the forseeable future, not until we can create some generalised form of artificial intelligence.

*Deep Learning* is a subset of machine learning algorithms encompassing artificial neural networks, whose
architectures are loosely inspired by the human brain. Deep learning is often used interchangeably with
neural networks when referring to this field. 
#### Types of machine learning
More generally, machine learning algorithms typically fall into 3 classes:
* **Supervised Learning:** This is where we provide the algorithm with the input *features* and also the correct output *labels*. Think of the algorithm as a student being asked to calculate the answer based on the input, whilst we act as the teacher, providing it with the right answer (label).
        
*  **Unsupervised Learning:** Suppose instead we just gave the algorithm the data without any labels. This is *unsupervised* learning - we are not telling the algorithm what is right or wrong - instead we let it make sense of the data. One example is a *clustering algorithm* which groups similar items in the dataset together.

*  **Reinforcement Learning:** This is where, at each timestep, the algorithm chooses one of a set of actions and then receives a reward based on whether the action was good or not (just like how you might give a dog a treat for performing a trick). The algorithm often starts off with trial-and-error, just like humans may fall over when learning to ride a bike. 
    
We will initially look at *supervised* learning algorithms, and only later look at the other two classes of machine learning.

#### Datasets


One area that is especially important in machine learning is the **data. ** Handling data 
properly is thus of paramount importance, and one of the pre-processing steps is to split the dataset into 
3 datasets:

*  **Training** 
*  **Validation** 
*  **Test** 

Why do we split the data? To get an unbiased estimate of the model's performance. If we test the algorithm on the training data, then the algorithm could have learnt the nuances of that particular dataset. So instead we use the validation dataset to evaluate the performance of the algorithm for various values of the *hyperparameters* - the "finetuning knobs" we adjust to maximise the performance of the algorithm. 

There's one catch though - now we've introduced bias into the validation set since we chose hyperparameters that would do best on it, so we need to have a separate *unbiased * benchmark - the test set.

We will look into preprocessing the data in more detail in later blog posts. The key takeaway is that we do not want an inflated view of our model - we want to know how well it can generalise to unseen data.

#### Types of Problem:

Finally, there are two main problems we look at in supervised learning - depending on the type of the output we are trying to predict.

* **Regression:** This is where the output prediction is real-valued and continuous, i.e it can take all values within a range - house prices can range from £100,000 to £500,000 for example.

* **Classification:** This is where the output is discrete - it can only take on one of a few categories - like for example types of objects in an image - e.g cats, dogs, birds etc. 

 *NB: there is a subtlety.* If we restricted the housing prices to "buckets" e.g. £0-10,000; £10,001-£50,000 etc. then this would actually turn this regression problem into a classification problem since there are a fixed number of discrete buckets.



### Summary 

Woah! That was a lot of terminology. It's important to have these terms in the back of your mind for later posts, since these terms are commonplace in most machine learning blog posts and tutorials.

In the next lession we will look at our first two machine learning algorithms, linear and logistic regression!
