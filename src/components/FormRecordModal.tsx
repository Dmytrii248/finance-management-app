import React, { useEffect, useState } from "react";
import moment from "moment";

import { FormRecordValues, RecordType, TagType } from "Constants/types";
import {
  numberToSliceForValueOption,
  startValueIdInOption,
} from "Constants/anotherConstant";
import { useGlobalContext } from "../store/GlobalContext";

import {
  DatePicker,
  Input,
  Form,
  Radio,
  InputNumber,
  Select,
  RadioChangeEvent,
} from "antd";
import Modal from "antd/lib/modal/Modal";

type propsType = {
  visible: boolean;
  onCreate: (values: RecordType) => void;
  onCansel: () => void;
  initialValue: RecordType;
};

const dateFormat = "DD-MM-YYYY";

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 12 },
};

const styleComp = {
  width: 200,
};

const FormRecordModal = (props: propsType) => {
  const { visible, onCreate, onCansel, initialValue } = props;
  const [form] = Form.useForm<FormRecordValues>();
  const [type, setType] = useState<string>("Income");
  const [tagsRecord, setTagsRecord] = useState<TagType[]>(null);
  const { recordCollection, tagCollection } = useGlobalContext();
  const { Option } = Select;

  const handleOnComplete = async () => {
    try {
      const fieldsForm = await form.validateFields();

      const tempArrTagsId = fieldsForm.idsTagsRecord.map(async (tagsId) => {
        if (!tagsId.toString().startsWith(startValueIdInOption)) {
          const createdTag = await tagCollection.add({
            typeTag: fieldsForm.typeRecord,
            nameTag: tagsId.toString(),
          });
          return createdTag.id;
        } else return +tagsId.toString().slice(numberToSliceForValueOption);
      });
      const newArrTagsId = await Promise.all(tempArrTagsId);

      const recordValues: RecordType = {
        ...fieldsForm,
        dateRecord: fieldsForm.dateRecord.toDate(),
        idsTagsRecord: newArrTagsId,
        amountMoney: Math.abs(+fieldsForm.amountMoney),
        descriptionRecord: fieldsForm.descriptionRecord || null,
      };

      if (initialValue) {
        recordValues.id = initialValue.id;
        const oldRecord = await recordCollection.put(
          initialValue.id,
          recordValues
        );
        onCreate(oldRecord);
      } else {
        const newRecord = await recordCollection.add(recordValues);
        onCreate(newRecord);
      }

      setType("Income");
      form.resetFields();
    } catch (e) {
      console.log("Form record not send", e);
    }
  };

  const handleOnCansel = () => {
    form.resetFields();
    setType("Income");
    onCansel();
  };

  const onChangeType = (e: RadioChangeEvent) => {
    setType(e.target.value);
    form.setFieldsValue({ idsTagsRecord: undefined });
  };

  useEffect(() => {
    (async () => {
      const tags = await tagCollection.getAll();
      setTagsRecord(tags);
    })();
  }, []);

  useEffect(() => {
    if (initialValue && form) {
      setType(initialValue?.typeRecord);
      form.setFieldsValue({
        ...initialValue,
        dateRecord: moment(initialValue.dateRecord),
        idsTagsRecord: initialValue.idsTagsRecord.map(
          (tagId) => `${startValueIdInOption}${tagId}`
        ),
      });
    }
  }, [initialValue]);

  return (
    <>
      <Modal
        visible={visible}
        onOk={handleOnComplete}
        onCancel={handleOnCansel}
        width={500}
      >
        <Form<FormRecordValues>
          {...layout}
          name="formRecord"
          form={form}
          onFinishFailed={(errorInfo: any) =>
            console.log("Form not send", errorInfo)
          }
          initialValues={{
            typeRecord: "Income",
            dateRecord: moment(),
            descriptionRecord: null,
          }}
        >
          <Form.Item
            label="Select type Record"
            name="typeRecord"
            rules={[{ required: true, message: "Type Rocord is required" }]}
          >
            <Radio.Group onChange={onChangeType}>
              <Radio.Button
                value="Income"
                style={{ width: 100, textAlign: "center" }}
              >
                Income
              </Radio.Button>
              <Radio.Button
                value="Expenses"
                style={{ width: 100, textAlign: "center" }}
              >
                Expenses
              </Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Select date record"
            name="dateRecord"
            rules={[
              {
                type: "object" as const,
                required: true,
                message: "Date is required",
              },
            ]}
          >
            <DatePicker format={dateFormat} style={styleComp} />
          </Form.Item>

          <Form.Item
            label="Select tag"
            name="idsTagsRecord"
            rules={[{ required: true, message: "Tag is required" }]}
          >
            <Select
              mode="tags"
              tokenSeparators={[","]}
              allowClear
              placeholder="Please select"
              style={styleComp}
            >
              {tagsRecord
                ?.filter((e) => e.typeTag === type)
                .map((e) => (
                  <Option key={e.id} value={`${startValueIdInOption}${e.id}`}>
                    {e.nameTag}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Amount"
            name="amountMoney"
            rules={[{ required: true, message: "Amount is required" }]}
          >
            <InputNumber placeholder="Amount" type="number" style={styleComp} />
          </Form.Item>

          <Form.Item label="Description" name="descriptionRecord">
            <Input placeholder="Description" style={styleComp} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FormRecordModal;
