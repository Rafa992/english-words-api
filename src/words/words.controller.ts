import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { WordsService } from './words.service';
import {EditWordDto} from './dto/staticWords.dto'

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Post('static')
  async createWords() {
    return this.wordsService.createWords();
  }

  @Auth()
  @Get('all')
  async getAllProduct() {
    return this.wordsService.getAllWords()
  }

  @Auth()
  @Post(':id')
  async getProductById(@Param('id') id: string) {
    return this.wordsService.getWordById(id)
  }

  @Auth()
  @Put('edit-word')
  async editWord(@Body() wordData: EditWordDto) {
    return await this.wordsService.editWord(wordData);
  }

  @Auth()
  @Delete('delete-words')
  async restartWord() {
    return await this.wordsService.restartWord();
  }
}
