import { Injectable } from '@nestjs/common'
import { words } from 'src/data/words'
import { PrismaService } from 'src/prisma.service'
import { EditWordDto } from './dto/staticWords.dto'

@Injectable()
export class WordsService {
	constructor(private readonly prisma: PrismaService) {}

	async createWords() {
		try {
			const createdWords = await this.prisma.words.createMany({
				data: words
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
