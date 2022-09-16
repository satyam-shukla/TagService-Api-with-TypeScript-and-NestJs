// public async create(currentUser: AuthUser, createTagDto: CreateTagDto): Promise<TagDocument> {
//     const existingTag = await this.tagModel
//       .findOne({
//         resource: createTagDto.resource,
//         resourceCode: createTagDto.resourceCode,
//         resourceType: createTagDto.resourceType,
//         name: createTagDto.name,
//         value: createTagDto.value,
//         deleted: false,
//       })
//       .exec();

//     if (!existingTag) {
//       const newTag = new this.tagModel({
//         ...createTagDto,
//         _id: new Types.ObjectId(),
//         createdBy: currentUser?.userId,
//         updatedBy: currentUser?.userId,
//       });
//       const data = await newTag.save();
//       if (!data) {
//         throw new NotFoundException('Tag not created!');
//       }

//       return data;
//     } else {
//       createTagDto.conditions = [...createTagDto.conditions, ...existingTag.conditions];

//       const output = [];
//       for (const condition of createTagDto.conditions) {
//         const existing = output.filter(function (v) {
//           return v.field === condition.field && v.type === condition.type;
//         });
//         if (existing.length > 0) {
//           const existingIndex = output.indexOf(existing[0]);
//           output[existingIndex].value = [...new Set([output[existingIndex].value, ...condition.value])];
//         }
//           output.push(condition);
//         }
//       }
//       createTagDto.conditions = output;

//       const data = await this.tagModel
//         .findByIdAndUpdate(
//           new Types.ObjectId(existingTag.id),
//           {
//             ...createTagDto,
//             updatedBy: currentUser?.userId,
//           },
//           { new: true },
//         )
//         .exec();

//       return data;
//     }
//   }