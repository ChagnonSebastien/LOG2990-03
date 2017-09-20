from random import randrange, shuffle
import json
import pprint
import re
import copy
from collections import deque

class Grid:
    'Crossword Grid'

    def __init__(self, size, lexicon):
        self.reset(size, lexicon)

    def reset(self, size, lexicon):
        self.size = size
        self.getLexicon(lexicon)
        self.initializeLexiconByLength()
        self.grid = [ [' ' for j in range(self.size)] for i in range(self.size) ]
        self.gridLetterCounter = [[0 for j in range(self.size)] for i in range(self.size)]
        self.gridContribution = [[[] for j in range(self.size)] for i in range(self.size)]
        self.words = set()
        self.wordsInCrossword = []
        self.constraintsToSatisfy = [(i / 2, True if i % 2 == 0 else False) for i in range(self.size * 2)]
        shuffle(self.constraintsToSatisfy)
        self.constraintsToSatisfy = deque(self.constraintsToSatisfy)
    
    def getLexicon(self, lexicon):
        with open(lexicon) as lexicon_file:
            self.lexicon = json.load(lexicon_file)

    def initializeLexiconByLength(self):
        self.lexiconByLength = {}
        for word in self.lexicon:
            if self.lexiconByLength.get(len(word)) is None:
                self.lexiconByLength[len(word)] = []
            self.lexiconByLength[len(word)].append(word)
    
    def sizeOfLexicon(self):
        return len(self.lexicon)

    def pprintLexicon(self):
        pprint.pprint(self.lexicon)

    def toRegex(self, pattern):
        return re.sub(r'\s', '[a-z]', pattern)

    def getWordsWith(self, pattern):
        if len(pattern) < 3:
            return []
        regex = re.compile(self.toRegex(pattern))
        return filter(regex.search, self.lexiconByLength[len(pattern)])

    def bestWordForLine(self, pattern):
        words = set()
        for i in range(3, 11):
            for j in range(i + 1, self.size):
                words |= set(self.getWordsWith(pattern[i:j]))
        if len(words) > 0:
            return list(words)[randrange(0, len(words))]
        else:
            return ''

    def getRandomWord(self):
        return self.lexicon[randrange(0, len(self.lexicon))]

    def insertLetter(self, letter, i, j):
        if self.gridLetterCounter[i][j] > 0 and self.grid[i][j] != letter:
            return False
        self.grid[i][j] = letter
        self.gridLetterCounter[i][j] += 1
        return True

    def addContribution(self, contribution, i, j):
        self.gridContribution[i][j].append(contribution)

    def removeContribution(self, contribution, i, j):
        self.gridContribution[i][j].remove(contribution)

    def deleteLetter(self, letter, i, j):
        if self.grid[i][j] != letter:
            return False
        if self.gridLetterCounter[i][j] > 1:
            self.gridLetterCounter[i][j] -= 1
        else:
            self.gridLetterCounter[i][j] = 0
            self.grid[i][j] = ' '
        return True

    def insertWord(self, word, i, j, horizontal):
        if word in self.words:
            return "Error: " + word + " already in grid"

        # size error
        if horizontal and self.size < j + len(word) or not horizontal and self.size < i + len(word):
            return "Error: cannot insert too long"

        # save states for rollback
        tempGrid = copy.deepcopy(self.grid)
        tempCounter = copy.deepcopy(self.gridLetterCounter)
        tempContribution = copy.deepcopy(self.gridContribution)

        # insertion
        contribution = {"word": word, "i": i, "j": j, "horizontal": horizontal}
        for letter in word:
            if not self.insertLetter(letter, i, j):
                # rollback
                self.grid = tempGrid
                self.gridLetterCounter = tempCounter
                self.gridContribution = tempContribution
                return "Error: invalid match"
            self.addContribution(contribution, i, j)
            if horizontal:
                j += 1
            else:
                i += 1
        self.words.add(word)
        self.wordsInCrossword.append({"word": word, "i": contribution["i"], "j": contribution["j"], "horizontal": horizontal})
        return "Successfully inserted: " + word

    def deleteWord(self, word, i, j, horizontal):
        if word not in self.words:
            return "Error: " + word + " not found in grid"

        # size error
        if horizontal and self.size < j + len(word) or not horizontal and self.size < i + len(word):
            return "Error: cannot delete out of range"

        # save states for rollback
        tempGrid = copy.deepcopy(self.grid)
        tempCounter = copy.deepcopy(self.gridLetterCounter)
        tempContribution = copy.deepcopy(self.gridContribution)

        # deletion
        contribution = {"word": word, "i": i, "j": j, "horizontal": horizontal}
        for letter in word:
            if not self.deleteLetter(letter, i, j):
                # rollback
                self.grid = tempGrid
                self.gridLetterCounter = tempCounter
                self.gridContribution = tempContribution
                return "Error: invalid match"
            self.removeContribution(contribution, i, j)
            if horizontal:
                j += 1
            else:
                i += 1
        self.words.remove(word)
        self.wordsInCrossword.remove({"word": word, "i": i, "j": j, "horizontal": horizontal})
        return "Successfully deleted: " + word

    def insertRandomWord(self):
        if len(self.constraintsToSatisfy) > 0:
            where = self.constraintsToSatisfy.popleft()
        if where[1] == True:
            pattern = ''.join(self.grid[where[0]])
        else:
            pattern = ''.join([self.grid[i][where[0]] for i in range(self.size)])
        wordToInsert = self.bestWordForLine(pattern)
        if len(wordToInsert) == 0:
            return False
        randomIndexes = [i for i in range(0, self.size - len(wordToInsert))]
        shuffle(randomIndexes)
        for i in randomIndexes:
            if where[1] == True:
                self.insertWord(wordToInsert, where[0], i, True)
            else:
                self.insertWord(wordToInsert, i, where[0], False)
            if wordToInsert in self.words:
                return True
    
    def generate(self):
        while len(self.constraintsToSatisfy) > 0:
            self.printGrid()
            if not self.insertRandomWord():
                self.reset(self.size, 'englishWords.json')

    def printGrid(self):
        print '-' * (4 * self.size + 1)
        for line in self.grid:
            print '|',
            for letter in line:
                print letter + ' |',
            print '\n-' + '-' * 4 * self.size

grid = Grid(10, 'englishWords.json')
# print grid.constraintsToSatisfy
#pprint.pprint(grid.gridContribution)
#print grid.sizeOfLexicon()
#grid.pprintLexicon()
# print grid.insertWord('hello', 0, 0, horizontal=True)
# print grid.insertWord('hello', 1, 0, True)
# print grid.insertWord('lisa', 2, 2, True)
# print grid.insertWord('oval', 0, 4, False)
# print grid.insertWord('audrey', 2, 4, True)
# grid.deleteWord('hello', 0, 0, True)
# pprint.pprint(grid.gridContribution)
# grid.deleteWord('oval', 0, 4, False)
grid.generate()
grid.printGrid()
pprint.pprint(grid.wordsInCrossword)
print len(grid.wordsInCrossword)