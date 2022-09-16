import {Entity,Column,PrimaryGeneratedColumn,AfterInsert,AfterRemove,AfterUpdate,CreateDateColumn,UpdateDateColumn,DeleteDateColumn} from 'typeorm'
import { tagStatus } from '../../common/constants/tag.status';

@Entity()
export class TagEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    type:string;

    @Column()
    value:string;

    @Column()
    resource:string;

    @Column()
    resourceCode:string;

    @Column()
    resourceType:string;

    @Column()
    conditions:string


    @Column({default:false})
    isDynamic:boolean;

    @Column({
        type:'enum',
        enum:tagStatus,
        default:tagStatus.ACTIVE
    })
    status:tagStatus

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    @DeleteDateColumn()
    deletedAt:Date;

    @AfterInsert()
    logInsert() {
      console.log('Inserted User with id', this.id);
    }

  
    @AfterUpdate()
    logUpdate() {
      console.log('Updated User with id', this.id);
    }


    @AfterRemove()
    logRemove() {
      console.log('Removed User with id', this.id);
    }

}


