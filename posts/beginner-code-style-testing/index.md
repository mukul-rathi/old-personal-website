---
series: Tools for Programmers
title: Why Continuous Integration will change the way you code
datePublished: 2019-04-02 10:00:00
dateModified: 2019-09-25 10:00:00
excerpt: A beginner's guide to testing and enforcing good code style across multiple languages.
image: ./tests.png
caption: Example output of Travis CI build
FAQs:
  [
    {
      question: "Why should I test my code?",
      answer:
        "Tests stop future you (or anyone for that matter) from breaking the code you're writing now - think of them as like a contract. Automating tests and style will save you sooo much time over the long run, as you can easily debug your code, since you know which tests are failing.

        ",
    },
    {
      question: "Why use code style guides?",
      answer:
        "Consider how you might layout something as simple as `import` statements. Perhaps you might choose to write your imports in alphabetical order, whilst another person groups them based on use. With functions, one person might swear by lambda functions, whilst another prefers to name all their functions, no matter how small.

        All of these small idiomatic decisions can lead to vastly differing code style between the developers on a project - imagine trying to review someone else's code with completely different layout preferences! It makes it hard to understand the codebase, since layout styles differ from one file to the next.
        ",
    },
    {
      question: "How should I write documentation for my code?",
      answer:
        "This should describe what the module/class/function does, not how you implemented it (since you might change that). Put yourself in the shoes of the person who might be calling your module/class/function - just like how you would read documentation for a library you'd use. This applies across languages - the two examples below are for Python and Java.

        ",
    },
        {
      question: "What are linters?",
      answer:
        " Linters such as Pylint for Python and ESlint for JavaScript are programs that check your code to see if it adheres to the conventions.

        Linters actually go even futher as a static code analysis tool - they have heuristics to spot programming errors before you run your code e.g. mistyping variables, unused imports/variables, duplicated code. For dynamically typed languages like Python and Javascript, this is especially useful as there are no compiler checks.
",
},
{
question: "How do I format my code to look good?",
answer:
"
Auto-formatters like YAPF and Prettier do this automatically for you!
It is well worth setting these formatters up in your IDE and/or in a Git pre-commit hook since it is then automated and you get pretty-looking code for free! Once you set up auto-formatting on saving a file, you can't go back to manual formatting!

        ",
    },
    {
      question: "How should I test my code?",
      answer:
        "The simplest tests are where you test one component / method in your code in isolation - these are called unit-tests.
good rule of thumb is to write your test like a story (it should read like English). The test name should be descriptive: it should reflect what you are testing and what you are expecting e.g. `ageInDaysAtBirthIsZero()`

The test should follow 3 steps:
Arrange input,
Act on method being tested,
Assert a single property
        ",
    },
    {
      question: "What is code test coverage?",
      answer:
        "Test coverage measures how well your tests cover your code - it's no good if you've got lots of tests but none of them cover a particular else branch, or if you haven't deal with edge cases in inputs.

Whilst 100% coverage doesn't guarantee the absence of bugs (nothing does), it means you've been thorough.

        ",
    },
    {
      question: "How should I test my code?",
      answer:
        "now that we have discussed good code quality, testing and test coverage, we would like to ensure this is enforced across the repository.

We talked about incrementally coding up some functionality and writing tests for that - wouldn't it be nice if our Git repository automatically ran our test suite on our committed changes to check we hadn't broken anything?
        ",
    },{
          question: "What is Continuous Integration?",
      answer:
        "
        Continuous Integration enforces good code quality, testing and test coverage across the repository, by automatically running our test suite on each committed change to check we hadn't broken anything.

        GitHub actually has test suites that integrate well with it, such as Travis CI.
        ",
    },
]
---

## Bug-free code is a myth when working at scale

You know the deal, you just change one _little_ feature, and that causes another part of your code to break as a side-effect, leading to a fun late-night debugging session! No matter, you know your code inside-out and it's quite a small project, so after a couple of hours you've fixed the bug and everything is great.

**Let's take this up a notch.** Picture this - another developer shipped some code to production, which you then modify to add a new feature. What you didn't realise was that you've just introduced a niche edge case, and 2 weeks later one of your users takes _that_ sequence of actions that perfectly syncs up to break your code. Oh, and now when you try and debug the code you realise the other developer lays his code out completely differently to you, so it's hard to even find the code that has broken.

To top it all off, you better hurry as your users aren't happy and complaining on social media. _Slightly higher stakes?_

Setting up an automated testing pipeline with thorough tests would've flagged up the edge case right as you were about to ship the code. Consistent code style would have meant it was then easy to read the code written by other developers on your team, and because you've caught this before it affects any users in production, you've avoided the stress of angry user complaints.

This post is here to bridge the gap between the code you might write for fun and code written working as part of a larger team. Talking about code structure in terms of software engineering principles like abstraction, modules etc. deserves its own post - in this post we won't look at these high-level ideas but more how to lay out code _stylistically_.

When it comes to testing, unlike many tutorials that are often "How to test in language X", I'll include examples in a few different languages (Python, Java, JavaScript) to show the underlying **concepts**.

The key take-away points from this tutorial:

- Tests stop future you (or anyone for that matter) from breaking the code you're writing now
- Automating tests and style will save you sooo much time over the long run!
- Continuous Integration (more on that later) will help you maintain great code!

## Style guides

Consider how you might layout something as simple as `import` statements. Perhaps you might choose to write your imports in alphabetical order, whilst another person groups them based on use. With functions, one person might swear by lambda functions, whilst another prefers to name all their functions, no matter how small.

All of these small idiomatic decisions can lead to vastly differing code style between the developers on a project - imagine trying to review someone else's code with completely different layout preferences! It makes it hard to understand the codebase, since layout styles differ from one file to the next.

Instead, developers should adhere to a **code style guide** - a set of guidelines as to how to format your code. This leads to **consistent** code style across the code base, which improves **readability** and also **maintainability**. [Google's Style Guides](http://google.github.io/styleguide/) are great examples of style guides.

### Use Docstrings for code documentation

This should describe _what_ the module/class/function does, not _how_ you implemented it. Put yourself in the shoes of the person who might be calling your module/class/function - just like how you would read documentation for a library you'd use. This applies across languages - the two examples below are for Python and Java.

```python
"""
Module docstring should consisely summarise overall module usage.

"""
def someFun(arg1, arg2):
  """ One line description of function

  Longer paragraph of what it does

  Args:
    arg1: what it is expecting
    arg2 (type): can optionally include type - be consistent!
  Returns:
    Explain what you are returning. Maybe give example.
  Raises:
    SomeException: message associated with exception
  """
  ... # body of function

class SomeClass():
  """ Summary

  Longer Description

  Attributes:
    attr1: describe this attribute
  """
  ... # code for class
```

```java
/*
Description of the method for JavaDoc

@param arg1  describe arg1
@param arg2  describe arg2
@return describe return value
@throws SomeException under certain condition.
*/
public double someMethod(int arg1, char arg2){
  ...
}
```

### Linters

Style guides also contain conventions - the order of your imports, how many public methods a class should have, variable named using snake_case vs camelCase, the list goes on and can be hard to remember.
Linters such as [Pylint](https://www.pylint.org/) (for Python) and [ESlint](https://eslint.org/) (JavaScript) are programs that check your code to see if it adheres to the conventions.

Linters actually go _even futher_ as a **static code analysis** tool - they have heuristics to spot programming errors before you run your code e.g. mistyping variables, unused imports/variables, duplicated code. For dynamically typed languages like Python and Javascript, this is especially useful as there are no compiler checks.

Running these checks is as simple as installing the linter (e.g. `pip install pylint`, or `yarn add eslint`) and then running them: e.g. `pylint <module>` or `eslint <directory>`. The linters then provide feedback on your code.

For example, Pylint flags up 5 categories of messages, in order of increasing severity:

- C convention
- R refactoring
- W warnings
- E errors(probable bugs)
- F fatal (if pylint can't analyse code)

For example:

- C0103: invalid-name (doesn't conform to snake_case naming style)
- R0201: Method could be a function (no-self-use)
- W0611: unused-import
- E0401: import-error
- F0010: parse-error

Sometimes the errors give suggestions e.g. `C0201: Consider iterating the dictionary directly instead of calling .keys())`

Pylint gives a code rating out of 10, based on the number of messages flagged up - whilst you shouldn't get caught up in getting a perfect 10.00/10, at least aim for a 7/10 (avoid most errors).

If you are not sure what a message means, the linters provide more information e.g you can run `pylint help-msg=<message>` where `<message>` = error code (C0111) or name (missing-docstring). To see the list of checks, you can run `pylint --list-msgs`.

ESlint actually fixes a lot of the warnings for you if you run `eslint --fix`!

#### Configuring your linter

Usually you'll want to configure the checks done by the linter, since not all the conventions may apply. In Pylint, you can do this with a `.pylintrc` file - Pylint actually creates one for you based on your current settings if you run `pylint --generate-rcfile > .pylintrc`. You can then run Pylint with `pylint --rcfile=<path_to_rcfile> <module>` to use these settings.

In ESLint, there's an interactive command-line tool to generate your own `.eslintrc` file - run `eslint --init`.

![ESLint setup](eslint-setup.svg)
_Example set-up for my website repo_

As well as a global configuration file, linters also allow you to disable errors on a line/block/class basis if you wanted to suppress warnings for a specific case.

For example, we get `C0103: Variable name "df" doesn't conform to snake_case naming style (invalid-name)` however `df` is a common naming convention for Pandas dataframes, so we write:

```python
df = .... #pylint: disable=C0103
```

In Pylint, to suppress a warning for a line, comment `#pylint: disable=<message>,<message2>` at end of line, and to suppress a warning over an entire class/block/function, the comment `#pylint: disable=<message>` should be the first line in the class/block/function.

With ESlint, it is similar - using `/*eslint disable <message>*/` followed by `/*eslint enable <message>*/` around the lines of code you want to suppress warnings for.

The key takeaway is that although linter warnings may seem annoying, they are incredibly useful at enforcing style guide conventions and spotting potential bugs and it's you can easily tailor them to your needs - _a no brainer_!

### Consistent formatting

To ensure all code is formatted in a consistent way, e.g. indented with 4 spaces, no trailing whitespace, we can run over the code with a **formatter**.

For Python a good formatter is [YAPF](https://github.com/google/yapf), whilst for a range of languages (including Javascript, SASS and even the Markdown files for this blog) you can use the formatter [Prettier](https://prettier.io/).

It is well worth setting these formatters up in your IDE and/or in a Git pre-commit hook since it is then automated and you get pretty-looking code for free! Once you set up auto-formatting on saving a file, you can't go back to manual formatting!

```python
#before yapf
x = {  'a':37,'b':42,

'c':927}

y = 'hello ''world'
z = 'hello '+'world'
a = 'hello {}'.format('world')
class foo  (     object  ):
  def f    (self   ):
    return       37*-2
  def g(self, x,y=42):
      return y
def f  (   a ) :
  return      37-a[42-x :  y**3]



#after yapf (google style)

x = {'a': 37, 'b': 42, 'c': 927}

y = 'hello ' 'world'
z = 'hello ' + 'world'
a = 'hello {}'.format('world')


class foo(object):

    def f(self):
        return 37 * -2

    def g(self, x, y=42):
        return y


def f(a):
    return 37 - a[42 - x:y**3]


```

## Testing

So now we've talked about good code style and making it easier for other people to maintain the code in your codebase but that's only _half_ the debugging battle!
Maintainable code is much easier to debug, but ideally we'd like to minimise the amount we have to debug in the first place! This is where **testing** comes in.

First one common misconception with testing is that it will slow you down, and what even do we write in our tests anyways?

You've probably _already_ been testing your code without realising it - when debugging if you've run the code with different inputs to isolate the source of the bug, well those are _test cases_, and those print statements mid-way through your code - those are _assertions_. All we'd like to do is formalise and automate that - so you don't have to repeatedly type that in again.

To do this we use a testing library/framework e.g. **xUnit testing libraries**.

### Unit Tests

The simplest tests are where you test one component / method in your code in isolation - these are called **unit tests**.

Tests need to be written well, so that when future developers break the code they can understand which test failed and what the purpose of that test was.

A good rule of thumb is to write your test like a story (it should read like English). The test name should be descriptive: it should reflect what you are testing and what you are expecting e.g. `ageInDaysAtBirthIsZero()`

The test should follow 3 steps:

- **Arrange** input variables
- **Act** on method being tested
- **Assert** a _single_ property

Good unit tests only test **one** thing at a time (can't stress enough!).

The xUnit framework lifecycle for each test is as follows (each test starts with fresh state):

- Run set-up methods
- Run test method
- Run teardown methods

For example in JUnit (Java framework) you'd specify each of the three types of method by tagging the methods with `@Before`, `@Test` and `@After` respectively.

Pytest is even nicer than xUnit frameworks in that it figures out the type of method based on the name - Pytest runs all python files starting with `test_` and identifies setup/teardown methods by their name. You can group together tests in a `Test__` class.

```python
import pytest

def TestSomeClass():
  def setup_method():
    ...
  def teardown_method():
    ...
  def test_add_to_5():
    #arrange
    x, y = 3, 2
    #act
    result = add(x, y)
    #assert
    assert result == 5

  def test_network_connection_success():
    #arrange
    network_params = ...
    # act
    result_code = connect_to_network(network_params)
    # assert
    assert result_code == 200 #test one thing

  def test_bad_network_connection():
    #arrange
    bad_network_params = ...
    # act + assert exception thrown
    with pytest.raises(IOException):
      connect_to_network(bad_network_params)
```

Even with something like testing a network connection over HTTP, the same paradigm applies as with the simple addition case - these frameworks really do make it _that_ simple to get started!

### Testing Pyramid

Broadly speaking there are 3 types of tests that form the testing pyramid (the percentages indicate which proportion you should do them in):

- Unit tests (70%)
- Integration tests(20%)
- End-to-end tests (10%)

**Integration tests** test multiple components together and **End-to-end tests** as you might have guessed test the entire system from user input to system output. They follow the same principles as user tests but tend to be more complex and _flaky_(pass and fail on same code).

#### Dependency Injection

This flakiness is an issue for us - we want tests to be repeatable! Tests that are particularly flaky are those testing methods that have internal dependencies on other classes. We want our unit tests to be done on components in _isolation_, not on components with dependencies.

**Dependency Injection** is a way of designing our methods so they are easier to test. Rather than having an internal dependency, we pass in the dependency as a parameter.

```python
def bad_func_to_test(arg1, arg2):
    ...
    curr_time = time.time() # bad - dependency on time class
    ...
    return some_val

def good_func_to_test(arg1, arg2, curr_time = time.time()):
    # good as dependency passed in
    ...
    return some_val

```

Why is this useful? When testing this function, we can now pass in an object to _simulate_ the dependency - this is known as **mocking**. We can get repeatability by controlling the behaviour of the simulated dependency using a **Mocking framework** - such as [Mockito](https://site.mockito.org/) for Java.

Here's an example testing a function `foo` that uses a `Clock` dependency.

```java
import static org.mockito.Mockito.*;
import org.junit.*;

public class SampleTest{
  @Before
  public void setupMethod(){
    // create our "mock" dependency
    Clock mockedClock = mock(Clock.class);
    int futureTime = 100;
    //specify behavour
    when(mockedClock.getStart()).thenReturn(0);
    when(mockedClock.getTime(futureTime)).thenThrow(new ImpossibleTimeException());
  }

  @Test
  public void testFooReturnsZero(){
    // arrange
    int x = 0;
    int y = 2;

    //act
    int result = foo(x, y, mockedClock);

    //assert
    assertThat(result, is(equalTo(0)));
  }
  ... //other tests
}
```

Again, just note how the testing framework methods read like English - these frameworks do all the hard work and give you these nice methods to use.

## Test coverage

Great, so we've talked about the different types of tests and at this point you're thinking - I'm done, I've written enough tests, _surely_ I've avoided the bugs now!

**Test coverage** measures how well your tests cover your code - it's no good if you've got lots of tests but none of them cover a particular `else` branch, or if you haven't deal with edge cases in inputs.

Whilst 100% coverage doesn't guarantee the absence of bugs _(nothing does)_, it means you've been thorough. However for some large codebases or codebases that deal with a lot of different input, it's pretty hard to get 100% - so like with the 10/10 linting score this is not a must.

Again, we have **test coverage tools** - by now you should be realising that all these tools make writing good quality code that much more accessible to beginners.

For example `Coverage.py` has a plugin that integrates nicely with _Pytest_. We can specify the options `pytest --cov=<module_with_tests> --cov-report html` where `--cov-report` specifies the format we wish to receive the results.

![Test Coverage example](test-coverage.png)
_A simple example for a bootstrap module being tested_

As with the linters, `Coverage.py` has its own `.coveragerc` config file - where we can specify if we want branch (`if else`) coverage, whether we want a minimum test coverage, and so on.

```yaml
[run]
branch = True # test for branch coverage
[report]
fail_under = 80
[html]
directory=htmlcov # where to store report
```

To keep test coverage high, the typical workflow is to incrementally code up some functionality and write tests for it. It's certainly a lot easier than one tests sprint, and test feedback can actually lead you to fix bugs and refactor code.

**Test-driven development** actually uses test feedback to flip the workflow - you write the tests _first_ and then write the code that will make the tests pass. Your tests thus act as a _specification_ for what your code should do.

## Continous Integration

So now that we have discussed good code quality, testing and test coverage, we would like to ensure this is enforced across the repository.

We talked about incrementally coding up some functionality and writing tests for that - wouldn't it be nice if our Git repository automatically ran our test suite on our committed changes to check we hadn't broken anything?

This is known as **Continuous Integration**. Again, (you can see a trend here) we have software CI suites that make our lives much easier. One of the most popular CI suites is **Travis CI**. Travis CI integrates with GitHub very easily.

**Sidenote:** If you are unfamiliar with Git, here is a [reference guide on Git commands](https://mukulrathi.com/git-beginner-cheatsheet/) - well worth learning version control!

Having set up Travis, we would like Travis to run our code in a test environment every time we push. For Travis to be able to do this, however, we need to (you guessed it) specify _another configuration file_ - a `.travis.yml` file in the repo to specify the test environment and the tests to run.

For each **commit** pushed to the repo, Travis will run a **build** that will pass/fail - this build consists of one or more jobs.

Each Travis CI **job** is made up of 3 stages:

- **install** (install dependencies)
- **script** (run tests - if any of these operations fails the job will fail)
- **deploy** (optional - e.g. deploy to AWS)

Often a lot of the stages are implicitly specified. For example, specifying `language:java` automatically installs Gradle (automating JUnit tests) in the `install` stage and runs `gradle build` in the `script` stage - so here your config file might just be one line long!

```yaml
language: java #yes, this is genuinely enough!
```

As with all the other configuration files, you can add a lot more control, choosing what is run before/during/after each stage and any other services you want installed in your test environment. You can even send notifications about whether the build passed/failed (e.g. to Slack)!

```yaml
sudo: required
language: python
python: 3.6
services:
  - docker
  - mongodb
before_install:
  #decrypt an env file.
  - openssl aes-256-cbc -K $encrypted_8a0a8349c0e8_key -iv $encrypted_8a0a8349c0e8_iv
    -in test.env.enc -out test.env -d

install:
  - pip install -r requirements.txt

script:
  - pytest --cov=tests/ # run pytest with test coverage
  - pylint src/ # run pylint over src code for errors
  - yapf -rd . #check if formatted correctly

notifications:
  slack:
    on_success: change
    on_failure: always
```

The Travis CLI tool actually has a `travis lint` command that double-checks your config file for you!

The Travis CI **build** for each commit can run multiple jobs in a _build matrix_, say if you had different test suites.

```yaml
language: python
matrix:
  include:
    #each point is a separate job
    - name: "3.5 Unit Test"
      python: "3.5"
      env: TEST_SUITE=suite_3_5_unit
    - name: "3.5 Integration Tests"
      python: "3.5"
      env: TEST_SUITE=suite_3_5_integration
    - name: "pypy Unit Tests"
      python: "pypy"
      env: TEST_SUITE=suite_pypy_unit
script: ./test.py $TEST_SUITE
```

## Summary

In this post we discussed a variety of tips and tools for you to take your code to the next level and. I hope you've seen that testing and code style are not too intimidating and that there are plenty of tools which mean it's not much effort to integrate them into your workflow and tailor them to your needs.

If you're anything like me, I find the snippets of code in tutorials are often not enough for me to implement these tools myself so I have a example [database server repo](https://github.com/mukul-rathi/CleanCycle/tree/tutorial) that uses Pylint, YAPF, Pytest and Travis CI (for the Pythonistas amongst you). Feel free to fork it to get started!

The [repo for this website](https://github.com/mukul-rathi/mukul-rathi.github.io) uses ESLint and Prettier as part of a pre-commit hook - this saves me so much time!

Finally, if you want great examples of industry-like code, I recommend getting involved in open-source codebases - for example [Openmined](https://github.com/OpenMined/PySyft) has enforced great code quality.

If you have any comments or questions, I'll be more than happy to answer them below. Happy coding!
