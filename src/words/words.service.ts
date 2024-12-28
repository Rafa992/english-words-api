import { Injectable } from '@nestjs/common'
import { words } from 'src/data/words'
import { PrismaService } from 'src/prisma.service'
import { EditWordDto, WordDto } from './dto/staticWords.dto'

@Injectable()
export class WordsService {
	constructor(private readonly prisma: PrismaService) {}

	async createWords() {
		try {
			function shuffle(arr: WordDto[]) { // функция перемешивания
				for (let i = arr.length - 1; i > 0; i--) {
				  const j = Math.floor(Math.random() * (i + 1));
				  [arr[i], arr[j]] = [arr[j], arr[i]];
				}
				return arr;
			}
			  
			const shuffledArray = shuffle(words);

			const createdWords = await this.prisma.words.createMany({
				data: shuffledArray
			})
			return createdWords
		} catch (error) {
			throw new Error('Error while creating static words: ' + error.message)
		}
	}

	async getAllWords() {
		try {
			const allWords = await this.prisma.words.findMany()
			return allWords
		} catch (error) {
			throw new Error('Error fetching all words: ' + error.message)
		}
	}

	async getWordById(id: string) {
		try {
			return await this.prisma.words.findUnique({
				where: { id }
			})
		} catch (error) {
			throw new Error('Error fetching word by id: ' + error.message)
		}
	}

	async editWord(wordData: EditWordDto) {
		try {
			return await this.prisma.words.update({
				where: {id: wordData.id},
				data: {
					order: wordData.order,
					en: wordData.en,
					transcription: wordData.transcription,
					ru: wordData.ru,
					ruFull: wordData.ruFull,
					learned: wordData.learned,
					unlearned: wordData.unlearned,
					repetitions: wordData.repetitions
				}
			})
		} catch (error) {
			throw new Error('error while editing word: ' + error.message)
		}
	}

}
