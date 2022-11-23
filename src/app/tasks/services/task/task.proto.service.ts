import { ProtoService } from "@main/services/proto/proto.service";
import { tutorial } from "@vernite/protobuf";

export class TaskProtoService extends ProtoService {

  public readonly TASK_NEW = this.subscribe(tutorial.Author);
  public readonly TASK_UPDATED = this.subscribe(tutorial.Author);

}
