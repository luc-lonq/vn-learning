import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Word {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    vn!: string;

    @Column()
    translation!: string;

    @Column()
    success!: number;

    @Column()
    fail!: number;

    @Column()
    added_at!: string;
}
