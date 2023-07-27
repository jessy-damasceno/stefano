import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({
	tableName: 'contacts',
	underscored: true,
	timestamps: false,
})

export class Contact extends Model<Contact> {
	@Column({
		primaryKey: true,
		autoIncrement: true,
	})
	id!: number;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	userId!: number;

	@BelongsTo(() => User, 'id')
  user!: User;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	contactId!: number;
}

// import { INTEGER, Model } from 'sequelize';
// import db from '.';
// import User from './user.model';

// interface ContactAttributes {
// 	id: number;
// 	userId: number;
// 	contactId: number;
// }

// class Contact extends Model<ContactAttributes> implements ContactAttributes {
// 	public id!: number;
// 	public userId: number;
// 	public contactId: number;
// }

// Contact.init(
// 	{
// 		id: {
// 			type: INTEGER,
// 			allowNull: false,
// 			primaryKey: true,
// 			autoIncrement: true,
// 		},
// 		userId: {
// 			type: INTEGER,
// 			allowNull: false,
// 		},
// 		contactId: {
// 			type: INTEGER,
// 			allowNull: false,
// 		},
// 	},
// 	{
// 		sequelize: db,
// 		modelName: 'contacts',
// 		underscored: true,
// 		timestamps: false,
// 	}
// );

// Contact.belongsTo(User, {
//   foreignKey: 'userId',
//   as: 'user',
// 	onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });

// Contact.belongsTo(User, {
//   foreignKey: 'contactId',
//   as: 'contact',
// 	onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });

// export default Contact;
