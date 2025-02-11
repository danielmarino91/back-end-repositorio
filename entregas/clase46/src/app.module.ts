import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MessagesModule } from './messages/messages.module';
import { CartsModule } from './carts/carts.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
ConfigModule.forRoot()

@Module({
    imports: [ProductsModule, MongooseModule.forRoot(process.env.MONGODB), MessagesModule, CartsModule, OrdersModule, UsersModule, AuthModule,],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }